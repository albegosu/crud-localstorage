let notesStorage = JSON.parse(localStorage.getItem("notes")) || [];

// CON OPERADOR TERNARIO '?' = IF - CONDITION ? TRUE : FALSE 
      // let notesStorage = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

const inputNote = document.getElementById("content");
const form = document.getElementById("addForm");

const listBuilder = (text) => {
    //CREAMOS UN ELEMENTO LI
    const note = document.createElement("li");
    note.innerHTML = text;
    //CREAMOS BOTON PARA DELETE  
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteNote(deleteBtn);
    });
    
    note.appendChild(deleteBtn);
    notes.appendChild(note);
  };

//FUNCIÓN PARA BOTÓN DELETE  
const deleteNote = (btn) => {

  //PADRE DEL BOTÓN QUE HEMOS CLICKADO PARA ELIMINAR
  let elementDlt = btn.parentNode;
  console.log(elementDlt);

  //CONVERTIMOS EN UN ARRAY TODOS LOS HIJOS DEL PADRE ANTERIORMENTE SELECCIONADO
  // SPREAD OPERATOR
  const arrayIndex = [...elementDlt.parentElement.children];
  console.log(arrayIndex);

  //AVERIGUAMOS LA POSICIÓN DEL ELEMENTO CONCRETO EN EL CUÁL HEMOS CLICKADO
  const index = [...elementDlt.parentElement.children].indexOf(elementDlt);
  console.log(`Eliminada nota. Posición: ${index}. El contenido era: ${notesStorage[index]}`);
  notesStorage.splice(index, 1);

  //ELIMINADO LA POSICIÓN SELECCIONADA DE LOCALSTORAGE
  localStorage.setItem("notes", JSON.stringify(notesStorage));
  elementDlt.remove();
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

// ATRAVESAR TODO EL LOCALSTORAGE
  for (let i = 0; i < localStorage.length; i++){
    console.log(localStorage);// do something with localStorage.getItem(localStorage.key(i));
}

//BOTON ELIMINAR CON CONFIRMACIÓN
const dltAll = document.getElementById("deleteAll");
dltAll.addEventListener('click', () => {
  const acept = confirm("¿Estás seguro de que deseas eliminar todas las notas? Esta acción no se puede deshacer.");

  if (acept) {
    localStorage.clear();
    notes.innerHTML = ""; // Borra todos los elementos <li> existentes
    notesStorage = []; // Asignamos un array vacío para formatear completamente el localStorage
    console.log(localStorage);
  }
});

//https://github.com/TylerPottsDev/yt-js-todo-2022/blob/master/main.js