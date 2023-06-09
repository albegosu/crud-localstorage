const btn = document.getElementById("changeBgColor");
const btnSun = document.getElementById("changeSunColor");

function changeDisplay () {
    btn.style.display = 'none';
    btnSun.style.display = ' ';
}


function changeBackground(colorBg, colorFont) {
    document.body.style.background = colorBg;
    document.body.style.color = colorFont;
    changeDisplay();
 }
 
btn.addEventListener("click",function() { changeBackground('var(--bgDark)', 'white') });
btnSun.addEventListener("click",function() { changeBackground('var(--bgLight)', 'black') });