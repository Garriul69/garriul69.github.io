---
title: "CRUD Angular + Firestore + RXJS"
description: "Configuración de Angular 16, Tailwind, Material y Firebase (claves redactadas)."
date: 2023-12-20
tags: ["angular","firebase","frontend"]
---

## Configuración de entorno para Angular 16

Para esto cambiaremos la versión de angular ya que estamos utilizando `nvm` entonces, cambiaremos la versión de node.js, por lo cual la cambiaremos con el siguiente comando `nvm install 16.14.0` que esa versión de node.js tiene angular 16, y después de esto asignaremos un alias a esta nueva instalación, en este caso la asignamos de la siguiente manera `nvm alias [nombre_alias] [version node]` por ejemplo: `nvm alias angular16 16.14.0` y para poder usar el entorno es: `nvm use angular16`.
De esta manera ya podemos empezar a trabajar con angular 16.
Podemos ver las versiones de node que hemos instalado con : `nvm ls` y las que podemos instalar con: `nvm ls-remote`.

Después de esto necesitamos instalar el cli de angular:
```bash
npm install -g @angular/cli@16
```

## Inicio de proyecto

Comenzamos el proyecto con el siguiente comando:

```bash
ng new App
```

### Añadir Angular Material
Ahora le añadiremos el angular material, con el siguiente comando:
```bash
ng add @angular/material
```

### Añadir Tailwind.CSS
Para poder trabajar con `tailwind.css` ncesitamos instalar tailwind y luego dejar el archivo de configuración de tailwind.css con los dos siguientes comandos:
```bash
npm install -D tailwindcss postcss autoprefixer
```

Y después:

```bash
npx tailwindcss init
```

Después en el archivo `angular.json` en el apartado de estilos debemos añadir la ruta: `"node_modules/tailwindcss/tailwind.css"` .

el archivo `tailwind.config.js` debe estar de la siguiente manera:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Luego en la ruta `src/styles.css` debe estar importado de la siguiente manera:

```css
/* You can add global styles to this file, and also import other style files */

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
  
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
```

Después de haber hecho todo estos, ahora empezaremos a armar los componentes de alumnos, cursos y profesores, de la siguiente manera:

``` bash
ng g m alumnos
ng g c alumnos --skip-tests
ng g s alumnos/alumnos --skip-tests
```

``` bash
ng g m profesores --routing
ng g c profesores --skip-tests
ng g s profesores/profesores --skip-tests
```

``` bash
ng g m cursos --routing
ng g c cursos --skip-tests
ng g s cursos/cursos --skip-tests
```

Después de haber generado los componentes ahora, haremos la conexión a la base de datos con firestore.
Para estos primero debemos instalar el firebase para angular de la siguiente manera:

```bash
npm i firebase @angular/fire@16
```

Tenemos que hacer la carpeta dentro de src y despues los archivos de environment.ts y environment.prod.ts dentro de la carpeta environments:
Después de esto, ambos archivos deben de tener lo siguiente:

```ts
export const environment = {

    production: false,
// configuración de firebase
    firebaseConfig: {
        // Obtén estos valores en Firebase Console — no publiques claves reales
        apiKey: "YOUR_API_KEY",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      }
};
```

Y falta agregar los environments en el archivo `angular.json` de la siguiente manera:

![Pasted image 20231218195058](/vault-imgs/Pasted%20image%2020231218195058.png)

Después de esto, debemos agregarlo en el archivo `app.module.ts` de la siguiente manera:

librerías:

```ts
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
```

imports:

```ts
AngularFireAuthModule,
AngularFirestoreModule,
AngularFireModule.initializeApp(environment.firebaseConfig)
```

De esta manera ya tenemos lista la conexión.

![Pasted image 20231220160756](/vault-imgs/Pasted%20image%2020231220160756.png)
