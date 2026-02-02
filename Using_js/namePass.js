// namePass.js
let title = document.getElementById("title");
let home = document.getElementById("home");
let about = document.getElementById("about");
let symbols = document.getElementById("symbols");
let numbers = document.getElementById("numbers");
let name = document.getElementById("name");
let length = document.getElementById("length");
let btn1 = document.getElementById("btn1");
let textarea = document.getElementById("textarea");



title.addEventListener("click", () => {
  window.location.href = "index.html";
});
home.addEventListener("click", () => {
  window.location.href = "index.html";
});
about.addEventListener("click", () => {
  window.location.href = "about.html";
});


btn1.addEventListener("click", () => {
  let len = length.value;
  let pas = "";
  let pools = [];

  let name1 = name.value;
let numbers1 = numbers.value ;
let symbols1 = symbols.value;


let array1 = [...name1];
let array2 = [...numbers1];
let array3 = [...symbols1];


   pools.push(...array1);
   pools.push(...array2);
   pools.push(...array3);
console.log(pools)
  if (len == "") {
  alert("Enter Password length");
    return;
  }
  // ❌ No option selected
  if (pools.length === 0) {
    textarea.textContent = "⚠️ Please Enter something";
    return;
  }

  // ✅ Password Generation
  for (let i = 0; i < len; i++) {
    let randomChar = pools[Math.floor(Math.random() * pools.length)];
    pas += randomChar;
  }

  // ✅ Display
  textarea.textContent = pas;
  textarea.style.fontSize = "15px";
  textarea.style.padding = "15px";
  textarea.style.fontFamily = "monospace";
});