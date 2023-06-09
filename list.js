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
});

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
        switch (note.slcCategory) {
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
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteBtn);
        oneNote.appendChild(label);
        oneNote.appendChild(content);
        oneNote.appendChild(actions);

        //FINALMENTE AGREGAMOS ONENOTE AL GRUPO notesList
        notesList.appendChild(oneNote);

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

