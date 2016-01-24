import { Map, List } from "immutable";
import { BLOGS, LAST_DATE, IS_FETCHING } from "../schema/stateTree";
import { SET_BLOGS, GET_BLOGS } from "../actions/action";

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
                .set(LAST_DATE, newBlogs.last().get("createdOn"))
                .set(IS_FETCHING, false);
    }
    else if ( !List.isList(currBlogs) && List.isList(newBlogs) && !newBlogs.isEmpty() ) {
        return state
                .set(BLOGS, newBlogs)
                .set(LAST_DATE, newBlogs.last().get("createdOn"))
                .set(IS_FETCHING, false);
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
     * @return {object} updated state tree
     */
    return state.set(IS_FETCHING, newState.get(IS_FETCHING));
}

export default function reducer(state = Map(), action) {
    switch (action.type) {
    case SET_BLOGS:
        return setBlogs(state, action.state);
    case GET_BLOGS:
        return getBlogs(state, action.state);
    default:
        return state;
    }
}
