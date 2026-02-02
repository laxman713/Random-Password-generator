//About.js
let title = document.getElementById("title");
let btn = document.getElementById("btn");
let home = document.getElementById("home");
let normalPass = document.getElementById("btn1");
let namePass = document.getElementById("btn2")
  

home.addEventListener("click",()=>{
    window.location.href="index.html";
})


title.addEventListener("click",()=>{
    window.location.href="index.html";
})

normalPass.addEventListener("click",()=>{
    window.location.href="normalPass.html";
})
namePass.addEventListener("click",()=>{
    window.location.href="namePass.html";
})
