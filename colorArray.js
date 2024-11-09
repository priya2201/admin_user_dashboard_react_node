let colors = ["red", "green", "blue", "yellow", "pink"];
let rev = colors
  .reverse()
  .map((a) => ({ a, length: a.length }))
  .filter((a) => a.length >= 5)
  .sort((a, b) => a.length - b.length)
  .map((obj) => obj.a);
console.log(rev);

//Question: Given the array [10, 21, 32, 43, 54, 65, 76, 87, 98], what will be the output after partitioning the elements into those divisible by 3 and those not, squaring the divisible ones, and then concatenating both arrays?
let ar1 = [10, 21, 32, 43, 54, 65, 76, 87, 98];
let op = ar1.reduce(
  (acc, cur) => {
    if (cur % 3 == 0) acc[0].push(cur ** 2);
    else acc[1].push(cur);
    return acc;
  },
  [[], []]
);
console.log(op);
let o1 = op[0].concat(op[1]);
console.log(o1);

//Question: For the array [1, 4, 9, 16, 25, 36], what will be the output after reversing the array, filtering out elements that are not perfect squares, mapping each remaining element to its square root, and then summing the square roots?

// let ar = [1, 4, 9, 16, 25, 36];
// let rev1 = ar
//   .reverse()
//   .filter((num) => Math.sqrt(num))
//   .map((num) => num ** 2)
//   .reduce((acc, cur) => acc + cur, 1);
// console.log(rev1);

let array2 = [1, 4, 9, 16, 25, 36];
let isPerfectSquare = (num) => Math.sqrt(num) % 1 === 0;
console.log(isPerfectSquare);
let output2 = array2.reverse().filter(isPerfectSquare).map(Math.sqrt);
console.log(output2);
let res = output2.reduce((acc, val) => acc + val, 0);
console.log(res); // 21

//Question: Given the array [1, 2, 3, 4, 5], what will be the output after rotating the array 1 position to the right, filtering out odd numbers, doubling the even numbers, and then creating a new array of objects with properties index and value?
let array3 = [1, 2, 3, 4, 5];
let rotri = (arr, n) => arr.slice(-n).concat(arr.slice(0, -n));
let o = rotri(array3, 1)
  .filter((n) => n % 2 === 0)
  .map((num, index) => ({ index, value: num * 2 }));
console.log(o);

//Question: For the array [5, 15, 25, 35, 45, 55, 65, 75], what will be the output after reversing the array, slicing the first 4 elements, mapping each element to an object with original and cube, sorting these objects by the cube value, and then returning an array of the original values?
let arr4 = [5, 15, 25, 35, 45, 55, 65, 75];
let ok = arr4
  .reverse()
  .slice(0, 4)
  .map((num) => ({ ordinal: num, cube: num ** 3 }))
  .sort((a, b) => a.cube - b.cube)
  .map((obj) => obj.ordinal);
console.log(ok);
