---
title: "Creando API REST con NestJS"
date: 2023-12-06
tags: ["nestjs", "nodejs", "backend"]
description: "Primeros pasos con NestJS CLI y generación de componentes."
---

## Crear el módulo REST (Cats)

NestJS CLI para iniciar el componente de la API:

![NestJS — generar recurso](/vault-imgs/Pasted%20image%2020231206130645.png)

Generar el CRUD completo:

![NestJS — CRUD generado](/vault-imgs/Pasted%20image%2020231206131041.png)

## Comandos Angular relacionados

Inicializar proyecto (standalone desactivado):

```bash
ng new name_proyect --standalone=false
```

Generar carpeta `environments`:

```bash
ng generate environments
```

Crear componente:

```bash
ng generate component components/edit --skip-tests
```

Forma abreviada:

```bash
ng g c components/edit --skip-tests
```

Crear servicio:

```bash
ng g s name_service --skip-tests
```

> **Nota:** Primero el módulo, luego el componente, para que quede declarado automáticamente.

```bash
ng g m alumnos
ng g c alumnos --skip-tests
ng g s alumnos/alumnos --skip-tests
```

Instalar Firebase para Angular:

```bash
npm i firebase @angular/fire
```
