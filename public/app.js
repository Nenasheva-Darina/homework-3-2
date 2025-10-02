let currentEditId = null;

 document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		// id - каждой задачи

		remove(id).then(() => {
			event.target.closest('li').remove()
		})

	}

	console.log(event.target.dataset.type);


	if (event.target.dataset.type === 'edit') {
		currentEditId = event.target.dataset.id
		console.log(currentEditId);
	}

	if (event.target.dataset.type === 'saveNewTitle') {
		console.log(currentEditId);
		const title = document.getElementById('editNoteInput').value
		console.log(title);

		if (currentEditId) {
			 edit(currentEditId, title).then(() => {
				const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
				modal.hide();
			})

			edit(currentEditId, title).then(() => {
    		location.reload(); // перезагружает страницу
			})
		}	
	}
})

async function remove(id) {
	await 	fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, title) {
	await 	fetch(`/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },  
    	body: JSON.stringify({title: title})
		
	})

}
