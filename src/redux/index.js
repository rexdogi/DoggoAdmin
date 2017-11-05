import {combineReducers} from "redux";
import category from 'redux/modules/category/index';
import page from 'redux/modules/page/index';

export default combineReducers({
    category,
    page
})