const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const archive= document.getElementById('archive');

showNotes();
let archivenotes=[];

function addNotes() {
  let notes = localStorage.getItem('notes');
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  if (addText.value == '') {
    alert('Add your note');
    return;
  }

  const noteObj = {
    title: addTitle.value,
    text: addText.value,
  };


  notes.push(noteObj);
  localStorage.setItem('notes', JSON.stringify(notes));
  showNotes();
}
function archiveNotes(i) 
{
   let notes= localStorage.getItem('notes');

   if(notes=== null)
   {
    return;
   }
   else{
     notes= JSON.parse(notes);
   }
   
   archivenotes.push(notes[i]);
   localStorage.setItem('archive_notes',JSON.stringify(archivenotes));
   console.log(archivenotes);
   showarchive_notes();
   






}
function showNotes() {
  let notesHTML = '';
  let notes = localStorage.getItem('notes');
  
  if (notes === null) {
    return;
  } else {
    notes = JSON.parse(notes);
  }
  
  for (let i=0; i<notes.length; i++) 
  {
    notesHTML += `<div class="note">
      <button class="deleteNote" id=${i}>Delete</button>
      <button class="archiveNote" id=${i}>archive</button>
      <button class="editnote" id=${i}>Edit</button>
      <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span>
      <div class="text">${notes[i].text}</div>
    </div>`;

   }
  
  
  notesDiv.innerHTML = notesHTML;
  archive.innerHTML = '';

  let title=[];
  let text=[]; 
  const deleteNoteButtons = document.getElementsByClassName('deleteNote');
  const archiveNoteButtons= document.getElementsByClassName('archiveNote');
  const editnotebuttons = document.getElementsByClassName('editnote');

  for (let i=0; i<title.length; i++) {
      title[i]=document.getElementsByClassName('title');
    };
   for (let i=0; i<text.length; i++) {
        text[i]=document.getElementsByClassName('text');
      };
  
  
  for (let i=0; i<deleteNoteButtons.length; i++) {
    deleteNoteButtons[i].addEventListener('click', function() {
      deleteNote(i);
    });
  }
  for (let i=0; i<archiveNoteButtons.length; i++) {
    archiveNoteButtons[i].addEventListener('click', function() {
      archiveNotes(i);
    });
  }
  for (let i=0; i<editnotebuttons.length; i++) {
  editnotebuttons[i].addEventListener('click', function() {
     editnote(i);
    });
  }
}
function editnote(i) {
    let notes = localStorage.getItem('notes');
    
    if (notes === null) {
      return;
    } else {
      notes = JSON.parse(notes);
    }
    
    const note = notes[i];
    
    const newTitle = prompt('Enter a new title', note.title);
    const newText = prompt('Enter new text', note.text);
    
    note.title = newTitle;
    note.text = newText;
    
    localStorage.setItem('notes', JSON.stringify(notes));
    
    showNotes();
  }
function showarchive_notes()
{
    let notesHTML = "";
    for(let i=0;i<archivenotes.length;i++)
    {
     notesHTML += `<div class="archiveNote">
        <h1>ARCHIVE NOTES</h1>
       <span class="title">${archivenotes[i].title}</span>
       <div class="text">${archivenotes[i].text}</div>
     </div>`;
 
    }

    archive.innerHTML= notesHTML;

}
function deleteNote(ind) {
    let notes = localStorage.getItem('notes');
  
    if (notes === null) {
      return;
    } else {
      notes = JSON.parse(notes);
    }
  
    notes.splice(ind, 1);
  
    localStorage.setItem('notes', JSON.stringify(notes));
  
    showNotes();
  }

addNoteButton.addEventListener('click', addNotes);

