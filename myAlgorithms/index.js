//РЕКУРСИВНЫЙ ПОДХОД --> на 70% быстрее for если элементов 10000, но в данном примере медленнее for на 3%
function binarySearch(data, target, start, end) {
  //1) Проверяем на соседнее число
  //2) Находим середину и округляем до меньшего
  //3) если среднее равно целевому значению, то выводим
  //4) если массив уменьшился до двух значений, и цель между ними. Возвращаем ближнее значение.
  //5) Проверяем, больше ли целевое значение чем среднее. Вызываем рекурсивно и подставляем middle на место start
  //5) Проверяем, меньше ли целевое значение чем среднее. Вызываем рекурсивно и подставляем middle на место end
  console.log("recursion-call");
  if (end < 1) return data[0];
  let middle = Math.floor(start + (end - start) / 2);

  if (target == data[middle]) return data[middle];

  if (end - 1 == start) {
    return Math.abs(data[start] - target) < Math.abs(data[end] - target) ? data[start] : data[end];
  }
  if (target > data[middle]) return binarySearch(data, target, middle, end);

  if (target < data[middle]) return binarySearch(data, target, start, middle);
}

//while
function binarySearchWile(arr, searchNumber) {
  let left = -1;
  let right = arr.length;
  while (right - left > 1) {
    console.log("while-call");
    let middle = Math.floor((left + right) / 2);
    if (searchNumber === arr[middle]) {
      return middle;
    }
    if (searchNumber > middle) {
      left = middle;
    } else {
      right = middle;
    }
  }
  return false;
}

//test ---> node index.js

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("recursion --->  ", binarySearch(data, 7, 0, data.length - 1));
console.log("while --->  ", binarySearchWile(data, 7));
