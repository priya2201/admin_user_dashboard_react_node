//Question: Given the array [2, 4, 6, 8, 10, 12, 14], what will be the output after filtering out elements less than 5, mapping each element to its square root, partitioning the roots into integer and non-integer parts, summing both partitions separately, and then returning an object with these sums?

let ar1 = [2, 4, 6, 8, 10, 12, 14];
let res1 = ar1.filter((e) => e >= 5);
console.log(res1, "res");
let res2 = res1.map(Math.sqrt);
console.log(res2);
let res3 = res2.reduce(
  (acc, cur) => {
    if (Number.isInteger(cur)) acc.integers.push(cur);
    else acc.nonIntegers.push(cur);
    return acc;
  },
  { integers: [], nonIntegers: [] }
);

let res4 = {
  sumIntegers: res3.integers.reduce((sum, val) => sum + val, 0),
  sumNonIntegers: res3.nonIntegers.reduce((sum, val) => sum + val, 0),
};
console.log(res4);

//Question: For the array ['hello', 'world', 'javascript', 'openai'], what will be the output after reversing each string, mapping each string to an array of its ASCII values, filtering out ASCII values less than 110, and then creating a string from the remaining ASCII values?

let array2 = ["hello", "world", "javascript", "openai"];
let toAscii = (str) => Array.from(str).map((char) => char.charCodeAt(0));
console.log(toAscii);
const asc1 = console.log(toAscii("piiopo"));
let res = array2.map((res) => res.split("").join(""));
console.log(res);

let op = array2
  .map((str) => str.split("").reverse().join())
  .flatMap(toAscii)
  .filter((e) => e >= 110)
  .map((ascii) => String.fromCharCode(ascii))
  .join("");
console.log(op);

//Question: Given the array [7, 14, 21, 28, 35, 42], what will be the output after mapping each element to an array of its divisors, flattening the arrays into a single array, filtering out duplicates, mapping each unique divisor to its square, and then finding the sum of these squares

let array3 = [7, 14, 21, 28, 35, 42];
let fd = (num) => {
  let divisors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i == 0) divisors.push(i);
  }
  return divisors;
};
let ok = array3.map((e) => e / 2);
