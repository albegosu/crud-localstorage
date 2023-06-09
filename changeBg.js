const btn = document.getElementById("changeBgColor");

function changeBackground(colorBg, colorFont) {
    document.body.style.background = colorBg;
    document.body.style.color = colorFont;
 }
 
btn.addEventListener("click",function() { changeBackground('var(--bgDark)', 'white') });