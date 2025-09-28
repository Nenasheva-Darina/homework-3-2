const fs = require('fs/promises')
const path = require('path');
const { option } = require('yargs');
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json') 

async  function addNote(title) {
	// const notes = require('./db.json')
	// const notes = Buffer.from(buffer).toString('utf-8')
	
	const notes = await getNotes()

	const note = {
		title,
		id: Date.now().toString()
	}

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.bgGreen("Note was added!"));
}


async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNotes()
	console.log(chalk.bgBlue('Here is the list of notes:'));
	
	notes.forEach(note => {
		console.log(chalk.yellowBright(note.id), chalk.blue(note.title));
	});
	
}

async function removeNote(id) {
	console.log(chalk.bgBlue(`Remove note by id: ${id}`));
	const notes = await getNotes()

	if (notes.find(note => note.id == id)) {
		const newArr = notes.filter(note => note.id != id)
		
		await fs.writeFile(notesPath, JSON.stringify(newArr))
	
		console.log(`Заметка с id: ${id} удалена`);
	} else {
		console.log(`Заметка с id: ${id} не найдена`);}
	
	
}



module.exports = {
	addNote, printNotes, removeNote
}