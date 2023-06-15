# crud-localstorage/

### FUNCIONALIDADES:
1. Permite al usuario editar el nombre del propietario
2. Permite escribir, etiquetar y agregar una nota
3. Permite marcar como completada una tarea
4. Permite editar / eliminar una nota
5. Permite eliminar todas las notas pero mantiene el nombre del propietario en LocalStorage

### CÓDIGO:

<sub>// CREAR ELEMENTOS QUE CONFIGUREN UNA NUEVA NOTE</sub>
```
const label = document.createElement('label');
const input = document.createElement('input');
const span = document.createElement('span');
const content = document.createElement('div');
const actions = document.createElement('div');
const edit = document.createElement('button');
const deleteBtn = document.createElement('button');
```

<sub> // DETECTAR CATEGORÍA Y ASIGNAR CLASE</sub>
```
switch (note.category) {
    case 'casa':
	span.classList.add('casa');
	break;
    case 'trabajo':
	span.classList.add('trabajo');
	break;
    case 'estudio':
	span.classList.add('estudio');
	break;

    default:
	span.classList.add('casa');
	break;
        };
```

<sub> // ASIGNAR NOMBRE CLASES</sub>
```
content.classList.add('noteContent');
actions.classList.add('actions');
edit.classList.add('edit');
deleteBtn.classList.add('delete');

content.innerHTML = `<input type="text" value="${note.content}" readonly>`;
edit.innerHTML = 'Edit';
deleteBtn.innerHTML = 'Delete';
```

<sub> // PADRES E HIJOS</sub>
```
label.appendChild(input);
label.appendChild(span);
actions.appendChild(edit);
actions.appendChild(deleteBtn);
oneNote.appendChild(label);
oneNote.appendChild(content);
oneNote.appendChild(actions);
```
<sub> // AGREGAMOS ONENOTE AL GRUPO notesList</sub>
```
notesList.appendChild(oneNote);
```

<sub> // FUNCION PARA BOTÓN DE EDITAR</sub>
```
edit.addEventListener('click', (e) => {
    const input = content.querySelector('input');
    input.removeAttribute('readonly');
    input.focus();
    input.addEventListener('blur', e => {
	input.setAttribute('readonly', true);
	note.content = e.target.value;
	localStorage.setItem('notes', JSON.stringify(notes));

	showNotes();
    });
});
```

<sub> // FUNCION PARA BOTÓN DE BORRAR</sub>
```
deleteBtn.addEventListener('click', (e) => {
    notes = notes.filter(t => t != note);
    localStorage.setItem('notes', JSON.stringify(notes));

    showNotes();
    })
});    
```

<sub> // BOTON ELIMINAR CON CONFIRMACIÓN</sub>
```
const deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener('click', () => {
  const acept = confirm("¿Estás seguro de que deseas eliminar todas las notas? Esta acción no se puede deshacer.");

  if (acept) {
    localStorage.removeItem('notes');
    notes.innerHTML = ""; // Borra todos los elementos <li> existentes
    notesStorage = []; // Asignamos un array vacío para formatear completamente el localStorage
    console.log(localStorage);
    showNotes(); // Llamamos a shownotes para ver la lista actualizada
    location.reload(); // Necesitamos un reload de la página para ver la lista vacía
  }
  
});
```
