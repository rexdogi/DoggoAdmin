import {get, post, put, destroy} from 'services/http-service';

const CATEGORIES = 'categories/CATEGORIES';
const CATEGORY_CREATED = 'categories/CATEGORY_CREATED';
const CATEGORY_DELETED = 'categories/CATEGORY_DELETED';
const CATEGORY_UPDATED = 'categories/CATEGORY_UPDATED';


const initialState = {
    categories: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES:
            return {...state, categories: action.payload};
        default:
            return state
    }
}

export function getCategories() {
    return (dispatch) => {
        get('/category')
            .then(response => {
                dispatch({type: CATEGORIES, payload: response.data})
            })
            .catch(err => console.log(err));
    }
}

export function createCategory(data) {
    return (dispatch) => {
        post('/category', data)
            .then(response => {
                dispatch(getCategories())
            })
            .catch(err => console.log(err));
    }
}

export function updateCategory(data) {
    return (dispatch) => {
        put('/category', data)
            .then(response => {
                dispatch(getCategories())
            })
            .catch(err => console.log(err));
    }
}

export function destroyCategory(id) {
    return (dispatch) => {
        destroy('/category/' + id)
            .then(response => {
                dispatch(getCategories())
            })
            .catch(err => console.log(err));
    }
}
