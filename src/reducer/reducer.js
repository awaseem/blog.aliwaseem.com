import { Map, List } from "immutable";
import { BLOGS, LAST_DATE } from "../schema/stateTree";
import {
    SET_BLOGS,
    GET_BLOGS,
    SET_ERROR,
    COMPLETE_BLOGS,
    SET_CURRENT_BLOG_VIEW,
    ARE_ALL_BLOGS_LOADED,
    SET_ADMIN_TOKEN,
    SET_SUCCESS
} from "../actions/action";

function setBlogs(state, newState) {
    /**
     * Add blogs to the state tree
     * @param {object} state - current state tree
     * @param  {object} newState - new state with new blogs
     * @return {object} state tree with concated blogs
     */
    const currBlogs = state.get(BLOGS);
    const newBlogs = newState.get(BLOGS);
    if ( List.isList(currBlogs) && List.isList(newBlogs) && !newBlogs.isEmpty() ) {
        return state
                .set(BLOGS, currBlogs.concat(newBlogs))
                .set(LAST_DATE, newBlogs.last().get("createdOn"));
    }
    else if ( !List.isList(currBlogs) && List.isList(newBlogs) && !newBlogs.isEmpty() ) {
        return state
                .set(BLOGS, newBlogs)
                .set(LAST_DATE, newBlogs.last().get("createdOn"));
    }
    else {
        return state;
    }
}

function getBlogs(state, newState) {
    /**
     * Updates the isFetching flag within the state tree to be true
     * @param {object} state - current state tree
     * @param  {object} newState - new state tree
     * @return {object} updated state tree with proper fetching flag
     */
    return state.merge(newState);
}

function setError(state, newState) {
    /**
     * sets the error
     * @param {object} state - current state tree
     * @param  {object} newState - new state tree
     * @return {object} updated state tree with proper errors set
     */
    return state.merge(newState);
}

function completeBlogs(state, newState) {
    /**
     * Updates the isFetching flag within the state tree to be false
     * @param {object} state - current state tree
     * @param  {object} newState - new state tree
     * @return {object} updated state tree with proper fetching flag
     */
    return state.merge(newState);
}

function allBlogsLoaded(state, newState) {
    /**
     * Updates the all blogs loaded flag within the state tree to be false
     * @param {object} state - current state tree
     * @param  {object} newState - new state tree
     * @return {object} updated state tree with proper all blogs loaded flag
     */
    return state.merge(state, newState);
}

function setCurrentView(state, newState) {
    /**
    * Updates the all blogs loaded flag within the state tree to be false
    * @param {object} state - current state tree
    * @param  {object} newState - new state tree
    * @return {object} updated state tree with proper all blogs loaded flag
    */
    return state.merge(state, newState);
}

function setAdminToken(state, newState) {
    /**
    * Updates the admin token within the state tree to be a value
    * @param {object} state - current state tree
    * @param  {object} newState - new state tree
    * @return {object} updated state tree with proper admin tokenn
     */
    return state.merge(state, newState);
}

function setSuccess(state, newState) {
    /**
    * Updates the success state within the state tree to be a value
    * @param {object} state - current state tree
    * @param  {object} newState - new state tree
    * @return {object} updated state tree with proper success state
     */
    return state.merge(state, newState);
}

export default function reducer(state = Map(), action) {
    switch (action.type) {
    case SET_BLOGS:
        return setBlogs(state, action.state);
    case GET_BLOGS:
        return getBlogs(state, action.state);
    case SET_ERROR:
        return setError(state, action.state);
    case ARE_ALL_BLOGS_LOADED:
        return allBlogsLoaded(state, action.state);
    case COMPLETE_BLOGS:
        return completeBlogs(state, action.state);
    case SET_CURRENT_BLOG_VIEW:
        return setCurrentView(state, action.state);
    case SET_ADMIN_TOKEN:
        return setAdminToken(state, action.state);
    case SET_SUCCESS:
        return setSuccess(state, action.state);
    default:
        return state;
    }
}
