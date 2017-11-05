import {get, post, put, destroy} from 'services/http-service';

const PAGES = 'pages/CATEGORIES';
const PAGE_CREATED = 'pages/PAGE_CREATED';
const PAGE_DELETED = 'pages/PAGE_DELETED';
const PAGE_UPDATED = 'pages/PAGE_UPDATED';


const initialState = {
    pages: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PAGES:
            return {...state, pages: action.payload};
        default:
            return state
    }
}

export function getPages() {
    return (dispatch) => {
        get('/page')
            .then(response => {
                dispatch({type: PAGES, payload: response.data})
            })
            .catch(err => console.log(err));
    }
}

export function createPage(data) {
    return (dispatch) => {
        post('/page', data)
            .then(response => {
                dispatch(getPages())
            })
            .catch(err => console.log(err));
    }
}

export function updatePage(data) {
    return (dispatch) => {
        put('/page', data)
            .then(response => {
                dispatch(getPages())
            })
            .catch(err => console.log(err));
    }
}

export function destroyPage(id) {
    return (dispatch) => {
        destroy('/page/' + id)
            .then(response => {
                dispatch(getPages())
            })
            .catch(err => console.log(err));
    }
}
