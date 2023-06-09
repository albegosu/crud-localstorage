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