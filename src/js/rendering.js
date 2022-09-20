import store from "./state.js";

export let columns = ['name', 'dateCreated', 'category', 'content', 'dateChanged'];
let actionButtons = ['Edit', 'Archive', 'Delete'];
let archivedButtons = ['Unarchive', 'Delete'];

export function updateHTML() {
    clearNotes('tbody');
    clearNotes('archiveBody');
    clearNotes('counting');
    renderNotes('actionItems');
    renderNotes('archiveItems');
    renderCountingNotes();
}

export function renderNotes(type) {
    if (type === "actionItems") {
        let activeNotes = store.getState().notes.filter((item) => !item.isArchive);
        addElement('tbody', activeNotes, actionButtons);
    } else if (type === "archiveItems") {
        let archiveNotes = store.getState().notes.filter((item) => item.isArchive);
        addElement('archiveBody', archiveNotes, archivedButtons);
    }
}

function clearNotes(type) {
    let tbody = document.getElementById(type);
    while (tbody.children.length !== 0) {
        tbody.removeChild(tbody.children[0]);
    }

}


function addElement(type, items, btns) {
    if (items.length !== 0) {
        let tbody = document.getElementById(type);
        for (let e of items) {
            let item = document.createElement('tr');
            tbody.appendChild(createInnerHtml(e, item, btns));
        }
    }
}

function createInnerHtml(obj, line, btns) {
    let state = store.getState();

    for (let e of columns) {
        let block = document.createElement('td');
        if (e === "name") {
            block.appendChild(addIcon(state, obj));
        }
        let item = document.createElement('span');
        item.innerHTML = obj[e];
        item.classList.add(e);
        block.appendChild(item);
        line.appendChild(block);
    }
    let block = document.createElement('td');
    for (let e = 0; e < btns.length; e++) {
        let btn = document.createElement('button');
        btn.classList.add(btns[e], obj.id);
        btn.innerHTML = btns[e];
        block.appendChild(btn);
        line.appendChild(block)
    }
    return line;
}

function addIcon(state, obj) {
    let icon = document.createElement('i');
    let iconClass = "fa-question";
    for (let i = 0; i < state.icons.length; i++) {
        if (state.icons[i].category === obj.category) {
            iconClass = state.icons[i].icon;
        }
    }
    icon.classList.add("fa-solid", iconClass);
    return icon;
}

export function renderCountingNotes() {
    let state = store.getState();
    let countingTableBody = document.querySelector('.counting');
    for (let e = 0; e < state.icons.length; e++) {
        let line = document.createElement('tr');

        let archive = document.createElement('td');
        let active = document.createElement('td');
        let category = document.createElement('td');

        let icon = document.createElement('i');
        icon.classList.add('fa-solid', state.icons[e].icon);

        let nameCategory = document.createElement('span');
        nameCategory.innerHTML = state.icons[e].category;

        category.appendChild(icon);
        category.appendChild(nameCategory);

        line.appendChild(category)

        let countActiveNotes = 0;
        let countArchiveNotes = 0;
    
        for (let i = 0; i < state.notes.length; i++) {
            if (state.notes[i].category === state.icons[e].category) {
                if (state.notes[i].isArchive) {
                    countArchiveNotes++;
                } else countActiveNotes++;
            }
        }
        let archiveSpan = document.createElement('span');
        archiveSpan.innerHTML = countArchiveNotes;
        let activeSpan = document.createElement('span');
        activeSpan.innerHTML = countActiveNotes;
        archive.appendChild(archiveSpan);
        active.appendChild(activeSpan);
        line.appendChild(active);
        line.appendChild(archive);
        countingTableBody.appendChild(line);
    }

}