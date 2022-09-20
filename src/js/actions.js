import { archiveNote, createNewNote, deleteNote, editNote, unarchiveNote } from "./reducer.js";
import store from "./state.js";


export function listener(event) {
    const deletebtn = event.target.closest('.Delete');
    const editbtn = event.target.closest('.Edit');
    const savebtn = event.target.closest('.Save');
    const archivebtn = event.target.closest('.Archive');
    const unarchivebtn = event.target.closest('.Unarchive');
    const addNotebtn = event.target.closest('.addNote');


    if (deletebtn) deleteButton(deletebtn);
    if (editbtn) editButton(editbtn);
    if (savebtn) saveButton(savebtn);
    if (archivebtn) archiveButton(archivebtn);
    if (unarchivebtn) UnarchiveButton(unarchivebtn);
    if (addNotebtn) {
        store.dispatch(createNewNote());

    }

};

function deleteButton(deletebtn) {
    let id = deletebtn.classList[1];
    store.dispatch(deleteNote(id));
}

function editButton(editbtn) {
    let state = store.getState();
    let line = editbtn.parentNode.parentNode;

    let allTR = line.querySelectorAll('span');
    for (let i = 0; i < allTR.length; i++) {
        if (allTR[i].classList[0] !== 'dateCreated' && allTR[i].classList[0] !== 'dateChanged') {
            if (allTR[i].classList[0] === 'category') {
                let select = document.createElement('select');
                select.classList.add('category')
                for (let e = 0; e < state.icons.length; e++) {
                    let option = document.createElement('option');
                    option.innerText = option.value = state.icons[e].category;
                    select.appendChild(option);
                }
                allTR[i].parentNode.replaceChild(select, allTR[i]);
            } else {
                let el = document.createElement('input');
                el.value = allTR[i].innerHTML;
                el.classList = allTR[i].classList;
                allTR[i].parentNode.replaceChild(el, allTR[i])
            }
        }

    }

    let editbutt = line.querySelector('.Edit');
    editbutt.innerHTML = 'Save';
    editbutt.classList.add('Save');
}

function saveButton(savebtn) {
    let data = createData(savebtn);
    store.dispatch(editNote(data));
}

function archiveButton(archivebtn) {
    let id = archivebtn.classList[1];
    store.dispatch(archiveNote(id));
}
function UnarchiveButton(unarchivebtn) {
    let id = unarchivebtn.classList[1];
    store.dispatch(unarchiveNote(id));
}

function createData(btn) {
    let line = btn.parentNode.parentNode;
    let id = btn.classList[1];
    let name = line.querySelector('.name').value;
    let dateCreated = line.querySelector('.dateCreated').textContent;
    let category = line.querySelector('.category').value;
    let content = line.querySelector('.content').value
    let dateChanged = line.querySelector('.dateChanged').value;
    let data = { id, name, dateCreated, category, content, dateChanged };
    return data;
}