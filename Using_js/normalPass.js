
//normalPass.js
let title = document.getElementById("title");
let home = document.getElementById("home");
let about = document.getElementById("about");
let includeNumbers = document.getElementById("includeNumbers");
let includeLowercase = document.getElementById("includeLowercase");
let includeUppercase = document.getElementById("includeUppercase");
let includeSymbols = document.getElementById("includeSymbols");
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

let lowercase = "abcdefghijklmnopqrstuvwxyz";
let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "1234567890";
let symbols = "!@#$%^&*()_+\\|}]{[><?/:";

let array = [...lowercase];
let array1 = [...uppercase];
let array2 = [...numbers];
let array3 = [...symbols];

btn1.addEventListener("click", () => {
  let len = length.value;
  let pas = "";
  let pools = [];

  // ✅ Add character sets based on checkboxes
  if (includeLowercase.checked) pools.push(...array);
  if (includeUppercase.checked) pools.push(...array1);
  if (includeNumbers.checked) pools.push(...array2);
  if (includeSymbols.checked) pools.push(...array3);

  // ❌ No option selected
  if (pools.length === 0) {
    textarea.textContent = "⚠️ Please select at least one character type!";
    return;
  }

  if(len==""){
    alert("Enter the password length");
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
