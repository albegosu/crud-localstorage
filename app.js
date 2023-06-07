let notesStorage = JSON.parse(localStorage.getItem("notes"));

// CON OPERADOR TERNARIO '?' = IF - CONDITION ? TRUE : FALSE 
// let notesStorage = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

const inputNote = document.getElementById("content");
const form = document.getElementById("addForm");

const listBuilder = (text) => {
    const note = document.createElement("li");
    note.innerHTML = text + ' <button onclick="deleteNote(this)" class="deleteBtn">x</button>' + ' <button onclick="editNote(this)" class="editBtn">-</button>';
    notes.appendChild(note);
  };

form.addEventListener('submit', e => {
    notesStorage.push(inputNote.value);
    localStorage.setItem("notes", JSON.stringify(notesStorage));
    listBuilder(inputNote.value);
    // SIN ESTA CONDICIÓN, NO SE PODRÍAN METER NUEVAS NOTAS
    inputNote.value = "";
});

const getNotes = JSON.parse(localStorage.getItem("notes"));
getNotes.forEach((note) => {
  listBuilder(note);
});

const deleteNote = (btn) => {
    let el = btn.parentNode;
    // SPREAD OPERATOR
    const index = [...el.parentElement.children].indexOf(el);
    notesStorage.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesStorage));
    el.remove();
  };

// ATRAVESAR TODO EL LOCALSTORAGE
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage);// do something with localStorage.getItem(localStorage.key(i));
}

console.log("holi");

//https://github.com/TylerPottsDev/yt-js-todo-2022/blob/master/main.js