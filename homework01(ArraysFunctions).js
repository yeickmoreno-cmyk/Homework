const array = [1, 2, 3, 4, 5];

// 1. at() - accede a elementos por índice
console.log(array.at(0));   // 1
console.log(array.at(-1));  // 5

// 2. concat() - une los arrays sin modificar el original
const array2 = [6, 7];
const combinado = array.concat(array2);
console.log(combinado);   // [1, 2, 3, 4, 5, 6, 7]

// 3. constructor() - Devuelve la función constructora del objeto.(tipo verificador)
console.log(array.constructor === Array); // true

// 4. copyWithin() - Copia una secuencia de elementos dentro del mismo Array
const array3 = ['a', 'b', 'c', 'd', 'e'];
array3.copyWithin(0, 3, 5);
console.log(array3);  // ['d', 'e', 'c', 'd', 'e']

// 5. entries() - retorna iterador con pares [índice, valor]
for (const [index, value] of array.entries()) {
  console.log(`${index}: ${value}`); 
  // 0: 1 
  // 1: 2 
  // 2: 3 
  // 3: 4 
  // 4: 5
}

// 6. every() - verifica si todos los elementos cumplen una condición
console.log(array.every(num => num > 0));  // true
console.log(array.every(num => num > 3));  // false

// 7. fill() - Reemplaza todos los elementos con un valor
const array4 = [1, 2, 3, 4, 5];
array4.fill(0);
console.log(array4);  // [0, 0, 0, 0, 0]

array4_2 = [1, 2, 3, 4, 5];
array4_2.fill(0, 1, 4);
console.log(array4_2);  // [1, 0, 0, 0, 5]


// 8. filter() - crea nuevo array con elementos que cumplan condición
const pares = array.filter(num => num % 2 === 0);
console.log(pares);  // [2, 4]

// 9. find() - retorna el primer elemento que cumple la condición
const resultado = array.find(num => num > 3);
console.log(resultado);  // 4

// 10. findIndex() - retorna el índice del primer elemento que cumple
const indice = array.findIndex(num => num > 3);
console.log(indice);  // 3

// 11. findLast() - retorna el último elemento que cumple la condición
const ultimoMayor = array.findLast(num => num > 2);
console.log(ultimoMayor);  // 5

// 12. findLastIndex() - retorna el índice del último elemento que cumple
const ultimoIndice = array.findLastIndex(num => num > 2);
console.log(ultimoIndice);  // 4

// 13. flat() - aplana arrays anidados
const anidado = [1, [2, 3], [4, [5, 6]]];
console.log(anidado.flat());      // [1, 2, 3, 4, [5, 6]]
console.log(anidado.flat(2));     // [1, 2, 3, 4, 5, 6]

// 14. flatMap() - mapea y luego aplana
const numeros = [1, 2, 3];
const resultado1 = numeros.flatMap(num => [num, num * 2]);
console.log(resultado1);  // [1, 2, 2, 4, 3, 6]

// 15. forEach() - itera sobre cada elemento
array.forEach((num, index) => {
  console.log(`Índice ${index}: ${num}`);
  // Índice 0: 1
  // Índice 1: 2
  // Índice 2: 3
  // Índice 3: 4
  // Índice 4: 5
});

// 16. includes() - verifica si contiene un elemento
console.log(array.includes(3));   // true
console.log(array.includes(10));  // false

// 17. indexOf() - retorna el índice de la primera ocurrencia
console.log(array.indexOf(3));    // 2
console.log(array.indexOf(10));   // -1 ,sino esta

// 18. join() - une todos los elementos en una cadena
console.log(array.join('-'));     // 1-2-3-4-5

// 19. keys() - retorna iterador de índices
for (const key of array.keys()) {
  console.log(key);  // 0, 1, 2, 3, 4
}

// 20. lastIndexOf() - retorna el índice de la última ocurrencia (la última posición de un elemento.)
const conDuplicados = [1, 2, 3, 2, 1];
console.log(conDuplicados.lastIndexOf(2));  // 3

// 21. map() - transforma cada elemento
const duplicados = array.map(num => num * 2);
console.log(duplicados);  // [2, 4, 6, 8, 10]

// 22. pop() - elimina y retorna el último elemento
const array5 = [1, 2, 3];
const ultimo = array5.pop();
console.log(ultimo);   // 3
console.log(array5);     // [1, 2]

// 23. push() - agrega uno o más elementos al final
const array6 = [1, 2];
array6.push(3, 4);
console.log(array6);     // [1, 2, 3, 4]

// 24. reduce() - reduce array a un valor único acumulando resultados
const suma = array.reduce((total, num) => total + num, 0);
console.log(suma);     // 15

// 25. reduceRight() - como reduce pero de derecha a izquierda
const resultado2 = array.reduceRight((total, num) => total - num, 0);
console.log(resultado2);  // (0 - 5 - 4 - 3 - 2 - 1) = -15

// 26. reverse() - invierte el array (modifica el original)
const array7 = [1, 2, 3];
array7.reverse();
console.log(array7);     // [3, 2, 1]

// 27. shift() - elimina y retorna el primer elemento
const array8 = [1, 2, 3];
const primero = array8.shift();
console.log(primero);  // 1
console.log(array8);     // [2, 3]

// 28. slice() - extrae una porción sin modificar el original
const porcion = array.slice(1, 4);
console.log(porcion);  // [2, 3, 4]

// 29. some() - verifica si al menos un elemento cumple condición
console.log(array.some(num => num > 4));  // true
console.log(array.some(num => num > 10)); // false

// 30. sort() - ordena el array
const array9 = [3, 1, 4, 1, 5];
array9.sort();
console.log(array9);     // [1, 1, 3, 4, 5]

// sort con comparador personalizado
const numeros2 = [3, 1, 4, 1, 5];
numeros2.sort((a, b) => b - a);
console.log(numeros2);  // [5, 4, 3, 1, 1]

// 31. splice() - modifica array removiendo/agregando elementos
const array10 = [1, 2, 3, 4, 5];
const removidos = array10.splice(2, 2, 'a', 'b');
console.log(removidos);  // [3, 4]
console.log(array10);      // [1, 2, 'a', 'b', 5]

// 32. toLocaleString() - convierte a string considerando localización
const numbers = [1000, 2000, 3000];
console.log(numbers.toLocaleString('es-CO'));
//1.000,2.000,3.000

// 33. toString() - convierte array a string
console.log(array.toString());  // 1,2,3,4,5

// 34. unshift() - agrega elementos al inicio
const array11 = [3, 4];
array11.unshift(1, 2);
console.log(array11);    // [1, 2, 3, 4]

// 35. values() - retorna iterador de valores
for (const value of array.values()) {
  console.log(value);  // 1, 2, 3, 4, 5
}