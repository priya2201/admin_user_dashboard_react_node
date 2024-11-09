let animlas = ["cat", "dog", "elephant", "tiger", "lion", "bear"];
let length = animlas.map((f) => f.length);
console.log(length);
let filter = animlas.filter((f) => f.length >= 5);
console.log(filter);
let sorte = filter
  .sort((a, b) => b.length - a.length)
  .map((item) => item.toUpperCase());
console.log(sorte);

let array10 = [1, 2, 3, 4, 5, 6];
let pairs = [];
for (let i = 0; i < array10.length - 1; i += 2) {
  pairs.push([array10[i], array10[i + 1]]);
}
console.log(pairs);
let op = pairs
  .flat()
  .filter((a) => a >= 3)
  .sort((a, b) => a - b);
console.log(op);

let array7 = [12, 5, 8, 130, 44];
let f1 = array7
  .filter((a) => a >= 10)
  .map((a) => Math.sqrt(a))
  .reduce((acc, cur) => acc * cur, 1);
console.log(f1);

let array6 = [5, 10, 15, 20, 25, 30];
let rev = array6
  .reverse()
  .map((num) => ({ original: num, double: num * 2 }))
  .sort((a, b) => a.double - b.double)
  .map((obj) => obj.original);
console.log(rev);
