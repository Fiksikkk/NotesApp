const EDIT_NOTE = 'EDIT-NOTE';
const CREATE_NEW_NOTE = 'CREATE-NEW-NOTE';
const DELETE_NOTE = 'DELETE-NOTE';
const ARCHIVE_NOTE = 'ARCHIVE-NOTE';
const UNARCHIVE_NOTE = 'UNARCHIVE-NOTE';

const reducer = (state, action) => {
    switch (action.type) {
        case CREATE_NEW_NOTE:
            let id = 1;
            let date = new Date().toLocaleDateString('en-US');
            if (state.notes.length !== 0) {
                id = state.notes[state.notes.length - 1].id + 1;
            }
            let newNote = {
                id: id,
                isArchive: false,
                name: '',
                dateCreated: date,
                category: '',
                content: '',
                dateChanged: ''
            };
            return {
                ...state,
                notes: [...state.notes, newNote]
            }
        case DELETE_NOTE:
            let newactiveItems = state.notes.filter((item) => item.id != action.id);
            return {
                ...state,
                notes: [...newactiveItems],
            }
        case EDIT_NOTE:
            let changedData = "";
            let today = new Date().toLocaleDateString('en-US');
            if (action.data.dateCreated !== today) {
                changedData = action.data.dateCreated + ',' + today;
            }
            let newactiveItemsE = state.notes.map((el) => (
                el.id == action.data.id
                    ? {
                        ...el, name: action.data.name,
                        category: action.data.category,
                        content: action.data.content,
                        dateChanged: changedData
                    }
                    : el
            ))
            return {
                ...state,
                notes: [...newactiveItemsE],
            }
        case ARCHIVE_NOTE:
            let newactiveItemsA = state.notes.map((el) => (
                el.id == action.id ? { ...el, isArchive: true } : el
            ))
            return {
                ...state,
                notes: [...newactiveItemsA],
            }
        case UNARCHIVE_NOTE:
            let newactiveItemsU = state.notes.map((el) => (
                el.id == action.id ? { ...el, isArchive: false } : el
            ))
            return {
                ...state,
                notes: [...newactiveItemsU],
            }
        default: return state;

    }
}

export const editNote = (data) => ({
    type: EDIT_NOTE, data
})
export const createNewNote = () => ({
    type: CREATE_NEW_NOTE
})
export const deleteNote = (id) => ({
    type: DELETE_NOTE, id
})
export const archiveNote = (id) => ({
    type: ARCHIVE_NOTE, id
})
export const unarchiveNote = (id) => ({
    type: UNARCHIVE_NOTE, id
})
export default reducer;