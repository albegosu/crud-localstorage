let notesStorage = JSON.parse(localStorage.getItem("notes")) || []; // Si no hay valor, asigna un Arry vacío
const inputNote = document.getElementById("content");
const form = document.getElementById("addForm");


const listBuilder = (text) => {
    const note = document.createElement("li");
    note.innerHTML = text;
    notes.appendChild(note);
  };

form.addEventListener('submit', e => {
    notesStorage.push(inputNote.value);
    localStorage.setItem("notes", JSON.stringify(notesStorage));
    listBuilder(inputNote.value);
    // SIN ESTA CONDICIÓN, NO SE PODRÍAN METER NUEVAS NOTAS
    // inputNote.value = "";
});

const getNotes = JSON.parse(localStorage.getItem("notes"));
getNotes.forEach((note) => {
  listBuilder(note);
});

// ATRAVESAR TODO EL LOCALSTORAGE
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(value);
}

// BOTON ELIMINAR TODAS LAS NOTAS
          // const dltAll = document.getElementById("deleteAll");
          // dltAll.addEventListener('click', () => {
          //   localStorage.clear();
          //   notes.innerHTML = ""; // Borra todos los elementos <li> existentes
          //   notesStorage = []; //Asignamos Arry vacío para formatear del todo localStorage
          //   console.log(localStorage); 
          // });


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