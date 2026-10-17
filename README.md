En JavaScript/TypeScript, las Regular Functions (funciones tradicionales) y las Arrow Functions (funciones flecha introducidas en ES6) difieren principalmente en la sintaxis, el manejo del contexto this, y cómo se gestionan como constructores.

Sintaxis: Las Arrow Functions ofrecen una estructura más limpia y concisa. Permiten retornos implícitos en expresiones de una sola línea.

Contexto de this (Lexical Binding): Las Regular Functions definen su propio valor de this dinámicamente según cómo son invocadas. En cambio, las Arrow Functions no tienen su propio this; heredan el this del ámbito (scope) donde fueron creadas. En Angular, esto es súper útil para evitar perder la referencia a la clase dentro de un callback.

Constructores: Las Regular Functions pueden usarse como constructores mediante la palabra clave new. Las Arrow Functions no pueden ser usadas como constructores y lanzarán un error si lo intentas.

Objeto arguments: Las Regular Functions tienen acceso directo al objeto arguments para ver los parámetros recibidos. Las Arrow Functions no lo poseen (se suele usar el operador rest ...args en su lugar).

| Característica | Regular Function | Arrow Function |
| :--- | :--- | :--- |
| **Sintaxis** | `function miFuncion() {}` | `const miFuncion = () => {}` |
| **Contexto `this`** | Dinámico (se define al momento de la ejecución). | Léxico (hereda el `this` del contexto donde se define). |
| **Uso como Constructor** | Sí (se puede usar `new`). | No (lanza error al usar `new`). |
| **Objeto `arguments`** | Disponible nativamente. | No disponible (requiere *Rest Parameters* `...args`). |
| **Elevación (Hoisting)** | Sí (si se declara como `function nombre()`). | No (sigue las reglas de `const` / `let`). |
| **Uso común en Angular** | Métodos principales de la clase de un componente. | Callbacks, suscripciones a Observables (RxJS) y eventos. |
