# crud-localstorage/

### FUNCIONALIDADES BÁSICAS DE CRUD<br>
● PERMITIRÁ crear/Create tareas<br>
● PERMITIRÁ ver/Read la lista de tareas<br>
● PERMITIRÁ editar/Update las tareas ingresadas previamente<br>
● PERMITIRÁ eliminar/Delete las tareas ingresadas previamente<br>
● PERMITIRÁ editar el estado de las tareas ingresadas previamente<br>
● Las tareas DEBEN tener dos estados (ToDo- Done)<br>
<br>
### FUNCIONES EXTRA<br>
● DEBE permitir filtrar por estado<br>
● DEBE permitir categorizar las tareas (Casa, Trabajo, Estudio)<br>
● DEBE permitir eliminar más de una tarea a la vez<br>
<br>
## CÓDIGO:

```
window.addEventListener('load', () => {
	notes = JSON.parse(localStorage.getItem('notes')) || [];
	const listName = document.querySelector('#listName');
	const addForm = document.querySelector('#addForm');

	const userList = localStorage.getItem('userList') || ' ';

	listName.value = userList;
    listName.addEventListener('change', e => {
        localStorage.setItem('userList', e.target.value);
    })

    addForm.addEventListener('submit', e => {
        e.preventDefault();

        const note = {
            content: e.target.elements.content.value,
            category: e.target.elements.slcCategory.value,
            done: false,
            createdAt: new Date().getTime()
        }

        notes.push(note);

        localStorage.setItem('notes', JSON.stringify(notes));

        e.target.reset();

        showNotes();
    })
    showNotes();
});
```
```
function showNotes() {
    const notesList = document.querySelector('#notesList');

    notesList.innerHTML = '';

    notes.forEach(note => {
        const oneNote = document.createElement('div');
        oneNote.classList.add('oneNote');

        //CREAR ELEMENTOS QUE CONFIGUREN UNA NUEVA NOTE
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = note.done;
        span.classList.add('bubble');

        //DETECTAR CATEGORÍA Y ASIGNAR CLASE
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

        //ASIGNAR NOMBRE CLASES
        content.classList.add('noteContent');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${note.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';

        //PADRES E HIJOS
        // span.appendChild(input);
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteBtn);
        oneNote.appendChild(label);
        oneNote.appendChild(content);
        oneNote.appendChild(actions);

        //FINALMENTE AGREGAMOS ONENOTE AL GRUPO notesList
        notesList.appendChild(oneNote);
        
        //MARCAR TAREA COMO 'DONE'
        if (note.done) {
            oneNote.classList.add('done');
        }

        input.addEventListener('click', (e) => {
            note.done = e.target.checked;
            localStorage.setItem('notes', JSON.stringify(notes));

            if (note.done) {
                oneNote.classList.add('done');
            } else {
                oneNote.classList.remove('done')
            }

            showNotes();
        })

        //FUNCION PARA BOTÓN DE EDITAR
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

        //FUNCION PARA BOTÓN DE BORRAR
        deleteBtn.addEventListener('click', (e) => {
            notes = notes.filter(t => t != note);
            localStorage.setItem('notes', JSON.stringify(notes));

            showNotes();
        })
    });    
}
```
```
//BOTON ELIMINAR CON CONFIRMACIÓN
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
