const arr = ["America", "Africa", "India", "Usa", "Ua"];
let filter = (arr, init) => {
  let i = init.toLowerCase();
  console.log(init);
  let array = arr.filter((a) => a.toLowerCase().startsWith(i));
  console.log(array);
};
let result1 = filter(["America", "Africa", "India", "Usa", "Ua"], "I");

let exmaple = "U";
let p1 = exmaple.charAt();
console.log(p1);

let result = arr.filter((f) => f.includes(exmaple));
console.log(result);
//1 is it array
let is_array = (arr) => {
  if (toString.call(arr) === "[object Array]") return true;
  return false;
};
console.log(is_array("w3resource"));
console.log(is_array([1, 2, 4, 0]));
//clone array

let array_Clone = (arr) => {
  return arr.slice(0);
};
console.log(array_Clone([1, 2, 4, 0]));
console.log(array_Clone([1, 2, [4, 0]]));

// 3 get first element
let first = (arr, n) => {
  if (n == null) return arr[0];
  if (arr == null) return void 0;
  if (n < 0) {
    return [];
  }
  return arr.slice(0, n);
};
console.log(first([7, 9, 0, -2]));
console.log(first([], 3));
console.log(first([7, 9, 0, -2], 3));
console.log(first([7, 9, 0, -2], 6));
console.log(first([7, 9, 0, -2], -3));
//4 print join elements
let myColor = ["Red", "Green", "White", "Black"];

let colorsJoin = myColor.join(",");
console.log(colorsJoin);
let plus = myColor.join("+");
console.log(plus);
// "expected o/p"
//     "Red,Green,White,Black"
// "Red,Green,White,Black"
// "Red+Green+White+Black"

//5 insert dashes between even nos
let no = "025468";
let nonow = no.toString();
console.log(nonow);
let array = nonow.split(" ");
console.log(array);
// let evenIInsert = no.map((no) => no % 2 == 0);
// console.log(evenIInsert);
// if (evenIInsert) return no.join("-");

// console.log(no);

// let num = window.prompt();
// let str = num.toString();
// console.log(str);
// let res = [str[0]];
// for (let x = 1; x < str.length; x++) {
//   if (str[x - 1] % 2 == 0 && str[x] % 2 == 0) {
//     res.push("-", str[x]);
//   }
//   res.push(str[x]);
// }
// console.log(res.join(""));

let k = ["Apple", "Banana", "Chickoo", "Cherry"];
let t = k.map((item) => item.split("").join(", ")).join(", ");

console.log(t);

let arr1 = [1, 2, 3, 4, 5, 6];
let k1 = [];
let k2 = [];

for (let i = 0; i < arr1.length; i++) {
  if (arr1[i] % 2 == 0) {
    k1.push(arr1[i]);
  } else {
    k2.push(arr1[i] % 2 != 0 && arr1[i] * arr1[i]);
  }
}
console.log(k1);
console.log(k2);

let fruits = ["apple", "banana", "orange", "strawberry", "kiwi"];
let k3 = fruits.filter((k) => k.length <= 6);
console.log(k3);
let k4 = k3.map((e) => e.toUpperCase());
console.log(k4);

let score = [
  { name: "Alice", score: 80 },
  { name: "Bob", score: 60 },
  { name: "Charlie", score: 75 },
];
let s1 = score.filter((k) => k.score > 70);
console.log(s1);
let s2 = s1.map((k) => k.name);
console.log(s2);

let arry = [[1, 2, 3], [4], [5, 6, 7, 8], [9, 10]];
let fd = arry.filter((f) => f.length >= 3);
let f1 = fd.flat();
console.log(f1);

let arys = [
  { title: "Book1", author: "Author1", year: 1995 },
  { title: "Book2", author: "Author2", year: 2005 },
  { title: "Book3", author: "Author3", year: 1980 },
];
let thousands = arys.filter((f) => f.year > 2000);
console.log(thousands);
let final = thousands.map((f) => f.title);
console.log(final);

const numbers = [9, -4, 16, -1, 25];
let nos = numbers.filter((n) => n > 0);
console.log(nos);
let even = nos.map((no) => Math.sqrt(no));
console.log(even);

const add = () => {};
