"""Builds the CV PDFs from cv-es.html and cv-en.html with headless Chrome (or Edge).

Public PDFs (no phone number, no postal code) go to public/cv/ and are served
by the site. Private PDFs (with phone and postal code, for sending to
employers) go to cv/private/ and are never committed. Private contact data
lives in cv/private.json, which is gitignored.

Usage:  python cv/build.py
"""
import json
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CV = ROOT / "cv"
BROWSERS = [
    Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
]
BROWSER = next((b for b in BROWSERS if b.exists()), None)
if BROWSER is None:
    sys.exit("Install Chrome or Edge to build the PDFs.")

LANGS = {
    "ES": {"src": "cv-es.html", "public_location": "Michoacán, México", "private_key": "location_es"},
    "EN": {"src": "cv-en.html", "public_location": "Michoacán, Mexico (remote)", "private_key": "location_en"},
}

private_file = CV / "private.json"
private = json.loads(private_file.read_text(encoding="utf-8")) if private_file.exists() else None


def render(lang: str, variant: str) -> Path:
    cfg = LANGS[lang]
    html = (CV / cfg["src"]).read_text(encoding="utf-8")
    if variant == "private":
        phone = f"<span>{private['phone']}</span>"
        location = private[cfg["private_key"]]
    else:
        phone = ""
        location = cfg["public_location"]
    html = html.replace("{{PHONE}}", phone).replace("{{LOCATION}}", location)
    tmp = CV / f".tmp-{lang}-{variant}.html"
    tmp.write_text(html, encoding="utf-8")
    return tmp


def to_pdf(html: Path, out: Path) -> int:
    out.parent.mkdir(parents=True, exist_ok=True)
    # Headless browsers sometimes exit 0 without writing the file, so remove the old PDF
    # first and retry until a fresh one exists.
    for attempt in range(1, 4):
        out.unlink(missing_ok=True)
        # A throwaway profile per run keeps parallel or leftover browser
        # processes from swallowing the print request.
        with tempfile.TemporaryDirectory(prefix="cv-edge-") as profile:
            subprocess.run(
                [str(BROWSER), "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                 f"--user-data-dir={profile}", f"--print-to-pdf={out}", html.as_uri()],
                check=True, capture_output=True,
            )
        if out.exists() and out.stat().st_size > 0:
            break
        time.sleep(2)
    else:
        html.unlink(missing_ok=True)
        raise RuntimeError(f"Browser did not produce {out}")
    pages = len(re.findall(rb"/Type\s*/Page[^s]", out.read_bytes()))
    html.unlink()
    return pages


failed = False
for lang in LANGS:
    variants = [("public", ROOT / "public" / "cv" / f"Andy-Gibran-Lopez-CV-{lang}.pdf")]
    if private:
        variants.append(("private", CV / "private" / f"Andy-Gibran-Lopez-CV-{lang}-private.pdf"))
    for variant, out in variants:
        pages = to_pdf(render(lang, variant), out)
        print(f"{lang} {variant}: {pages} page(s) -> {out.relative_to(ROOT)}")
        failed = failed or pages != 1
sys.exit(1 if failed else 0)
