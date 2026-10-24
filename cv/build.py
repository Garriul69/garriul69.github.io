"""Builds the CV PDFs from cv-es.html and cv-en.html with headless Edge.

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
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CV = ROOT / "cv"
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")

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
    subprocess.run(
        [str(EDGE), "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
         f"--print-to-pdf={out}", html.as_uri()],
        check=True, capture_output=True,
    )
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
