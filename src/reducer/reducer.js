import { Map } from "immutable";
import { SET_BLOGS } from "../actions/action";

function setBlogs(state, newState) {
    /**
     * Immutable js has a merge method which can combine two objects being
     * passed in.
     * @param {object} state - current state tree
     * @param  {object} newState - new state to merge
     * @return {object} state tree with merged blogs
     */
    return state.merge(newState);
}

export default function reducer(state = Map(), action) {
    switch (action.type) {
    case SET_BLOGS:
        return setBlogs(state, action.state);
    default:
        return state;
    }
}
