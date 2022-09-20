import reducer from "./reducer.js";
import { updateHTML } from "./rendering.js";

let store = {
    _state: {
        notes: [
            {
                id: 1,
                isArchive: false,
                name: 'Shopping, list',
                dateCreated: '05/20/2021',
                category: 'Task',
                content: 'Tomatoes, bread',
                dateChanged: ''
            },
            {
                id: 2,
                isArchive: false,
                name: 'The theory of evolition',
                dateCreated: '05/27/2021',
                category: 'Random Thought',
                content: 'The theory of evolition',
                dateChanged: ''
            },
            {
                id: 3,
                isArchive: false,
                name: 'New Feature',
                dateCreated: '06/05/2021',
                category: 'Idea',
                content: 'Implement new features',
                dateChanged: ''
            },
            {
                id: 4,
                isArchive: false,
                name: 'William Gaddis',
                dateCreated: '06/07/2021',
                category: 'Quote',
                content: 'Please, doesn`t communicate',
                dateChanged: ''
            },
            {
                id: 5,
                isArchive: false,
                name: 'Books',
                dateCreated: '15/08/2021',
                category: 'Task',
                content: 'The Lean Startup',
                dateChanged: ''
            }
        ],
        icons: [
            {
                category: "Task",
                icon: "fa-cart-shopping",
            },
            {
                category: "Random Thought",
                icon: "fa-gear",
            },
            {
                category: "Idea",
                icon: "fa-lightbulb",
            },
            {
                category: "Quote",
                icon: "fa-quote-right",
            },
        ]
    },

    getState() {
        return this._state;
    },


    dispatch(action) {
        this._state = reducer(this._state, action);
        updateHTML();
    }
}


export default store;
window.store = store;