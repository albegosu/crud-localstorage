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
            done: false
        }

        notes.push(note);

        localStorage.setItem('notes', JSON.stringify(notes));

        e.target.reset();

        showNotes();
    })
    showNotes();
});

function showNotes() {
    const notesList = document.querySelector('#notesList');

    notesList.innerHTML = '';

    notes.forEach(note => {
        const oneNote = document.createElement('div');
        oneNote.classList.add('oneNote');

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

        content.classList.add('noteContent');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${note.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteBtn);
        oneNote.appendChild(label);
        oneNote.appendChild(content);
        oneNote.appendChild(actions);

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

        deleteBtn.addEventListener('click', (e) => {
            notes = notes.filter(t => t != note);
            localStorage.setItem('notes', JSON.stringify(notes));

            showNotes();
        })
    });    
};

const deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener('click', () => {
  const acept = confirm("¿Estás seguro de que deseas eliminar todas las notas? Esta acción no se puede deshacer.");

  if (acept) {
    localStorage.removeItem('notes');
    notes.innerHTML = ""; 
    notesStorage = []; 
    console.log(localStorage);
    showNotes(); 
    location.reload(); 
  }

});