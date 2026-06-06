---
title: "Pseudoclases y pseudoelementos CSS"
date: 2023-10-31
tags: ["css","frontend"]
---

## Pseudoclases:

1. **Estados del Enlace**:
    
    - `:link`: selecciona enlaces que aún no han sido visitados.
    - `:visited`: selecciona enlaces que han sido visitados.
    - `:hover`: selecciona elementos sobre los que se pasa el ratón.
    - `:active`: selecciona elementos mientras están siendo activados (por ejemplo, mientras se hace clic en un enlace).
2. **Posición del Elemento**:
    
    - `:first-child`: selecciona el primer hijo de un elemento.
    - `:last-child`: selecciona el último hijo de un elemento.
    - `:nth-child(n)`: selecciona el n-ésimo hijo de un elemento.
    - `:nth-last-child(n)`: selecciona el n-ésimo hijo de un elemento, contando desde el último.
    - `:first-of-type`: selecciona el primer elemento de su tipo.
    - `:last-of-type`: selecciona el último elemento de su tipo.
    - `:nth-of-type(n)`: selecciona el n-ésimo elemento de su tipo.
    - `:nth-last-of-type(n)`: selecciona el n-ésimo elemento de su tipo, contando desde el último.
3. **Estado de los Formularios**:
    
    - `:enabled`: selecciona elementos de formulario que están habilitados.
    - `:disabled`: selecciona elementos de formulario que están deshabilitados.
    - `:checked`: selecciona elementos de formulario que están marcados (como radio o checkbox).
    - `:focus`: selecciona el elemento de formulario que tiene el foco.
    - `:required`: selecciona elementos de formulario que tienen el atributo "required".
    - `:optional`: selecciona elementos de formulario que no tienen el atributo "required".
    - `:valid`: selecciona elementos de formulario con contenido válido.
    - `:invalid`: selecciona elementos de formulario con contenido no válido.
    - `:placeholder-shown`: selecciona elementos de formulario que muestran su texto de marcador de posición.
4. **Otros**:
    
    - `:not(selector)`: selecciona todos los elementos que no coincidan con el selector especificado.
    - `:root`: selecciona el elemento raíz de un documento.
    - `:empty`: selecciona elementos que no tienen hijos (incluyendo texto).
    - `:target`: selecciona el elemento único que es objetivo de un fragmento URI.
    - `::before` y `::after`: permiten insertar contenido antes o después del contenido de un elemento. (Nota: técnicamente son pseudo-elementos, no pseudoclases).

## Pseudoelementos

1. `::before`: Inserta contenido antes del contenido del elemento seleccionado. A menudo se usa junto con la propiedad `content`.
    
2. `::after`: Inserta contenido después del contenido del elemento seleccionado. También se utiliza con la propiedad `content`.
    
3. `::first-line`: Selecciona la primera línea de un elemento de bloque, lo que permite aplicar estilos específicos a esa primera línea.
    
4. `::first-letter`: Selecciona la primera letra del texto de un elemento de bloque, permitiendo aplicar estilos específicos a esa letra.
    
5. `::selection`: Selecciona la parte del texto que ha sido seleccionada por el usuario (por ejemplo, cuando el usuario arrastra el ratón sobre algún texto).
    
6. `::placeholder`: Selecciona el texto del marcador de posición en un elemento de formulario `<input>` o `<textarea>` para aplicar estilos.
    
7. `::marker`: Estiliza el marcador de un elemento de lista (`<li>`) cuando se utiliza en conjunción con listas estilizadas (`list-style-type`).
    
8. `::backdrop`: Selecciona el fondo que está detrás de una caja y debajo de cualquier otro contenido, útil para elementos con la propiedad `position: fixed` o `position: sticky`.
    
9. `::cue`: Selecciona las pistas de un elemento `<track>`, utilizado en subtítulos y descripciones en videos.
    
10. `::slotted()`: Selecciona los nodos de contenido que están siendo distribuidos en un elemento con una sombra DOM.
