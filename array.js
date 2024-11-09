let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i == 0) return false;
  }
  return true;
};
console.log(isPrime);
let filtered = arr.filter((num) => !isPrime(num));
let max = Math.max(...filtered);
let op = filtered.map(() => max);
console.log(op);

let arrayFlatFilter = (arr) => {
  let o1 = arr
    .flat()
    .filter((f) => f % 2 !== 0)
    .map((f) => f ** 2)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(o1, "-");
};
console.log(
  arrayFlatFilter([
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9],
  ])
);

let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let op2 = array2.reduce(
  (acc, num) => {
    (num % 2 === 0 ? acc.even : acc.odd).push(num);

    return acc;
  },
  { even: [], odd: [] }
);
let evenProduct = op2.even.reduce((acc, val) => acc * val, 1);
let oddProduct = op2.odd.reduce((acc, val) => acc * val, 1);
console.log([evenProduct, oddProduct]);

let array3 = [10, 20, 30, 40, 50, 60, 70, 80, 90];
let o3 = array3
  .reverse()
  .slice(0, 5)
  .map((num) => num / 2)
  .reduce((obj, val, index) => {
    obj[array3[index]] = val;
    return obj;
  }, {});
console.log(o3);
let output3 = array3
  .reverse()
  .slice(0, 5)
  .map((num) => num / 2)
  .reduce((obj, val, index) => {
    obj[array3[index]] = val;
    return obj;
  }, {});
console.log(output3);

let array4 = [1, 2, 3, 4, 5, 6];
// let rotateLeft = (arr, n) => arr.slice(n).concat(arr.slice(0, n));
// let fact = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
// let o4 = rotateLeft(array4, 2).map(fact);
// console.log(o4);

let rotateLeft = (arr, n) => arr.slice(n).concat(arr.slice(0, n));
let factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
let output4 = rotateLeft(array4, 2)
  .map(factorial)
  .some((val) => val > 100);
console.log(output4);

let array5 = [5, 10, 15, 20, 25, 30];
let fh = Math.ceil(array5.length / 2);
let fh1 = array5.slice(0, fh);
console.log(fh1);
let sh = array5.slice(fh).reverse();
console.log(sh);
let o5 = fh1.flatMap((val, index) => [val, sh[index]]).filter((f) => f >= 15);
console.log(o5);
let halfLength = Math.ceil(array5.length / 2);
let firstHalf = array5.slice(0, halfLength);
let secondHalf = array5.slice(halfLength).reverse();
let output5 = firstHalf
  .flatMap((val, index) => [val, secondHalf[index]])
  .filter((num) => num >= 15);
console.log(output5); //

let array6 = ["apple", "banana", "cherry", "date", "fig", "grape"];
let gl = array6.reduce((acc, val) => {
  let len = val.length;
  (acc[len] = acc[len] || []).push(val);
  return acc;
}, {});
let o6 = Object.keys(gl)
  .sort((a, b) => a - b)
  .map((key) => gl[key].join("-"));
console.log(o6);

let array7 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// let on = array7.filter((index) => index % 2 === 1);
// let sum = on.reduce((acc, curr) => acc + curr, 0);
// let o7 = on.map(() => sum);
// console.log(o7);
let filter = array7.filter((_, index) => index % 2 === 1);
console.log(filter);
let sum = filter.reduce((acc, val) => acc + val, 0);
console.log(sum);
let output7 = filter.map(() => sum);
console.log(output7);

let array8 = [2, 4, 6, 8, 10];
let dl = array8.map((num) => num * 2);
let part = dl.reduce(
  (acc, num) => {
    (num % 4 === 0 ? acc[0] : acc[1]).push(num);
    return acc;
  },
  [[], []]
);
console.log(part);
let o8 = part.map((arr) => arr.length);
console.log(o8);
let doubled = array8.map((num) => num * 2);
let partitioned = doubled.reduce(
  (acc, num) => {
    (num % 4 === 0 ? acc[0] : acc[1]).push(num);
    return acc;
  },
  [[], []]
);
let output8 = partitioned.map((arr) => arr.length);
console.log(output8); // [4, 1]

let array9 = [10, 20, 30, 40, 50];
let o = (arr, n) => arr.slice(-n).concat(arr.slice(0, -n));
let o1 = o(array9, 3)
  .filter((num) => num <= 30)
  .reverse();
console.log(o1);
