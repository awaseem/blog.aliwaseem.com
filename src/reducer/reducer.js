import { Map, List } from "immutable";
import { SET_BLOGS } from "../actions/action";

function setBlogs(state, newState) {
    /**
     * Immutable js has a merge method which can combine two objects being
     * passed in.
     * @param {object} state - current state tree
     * @param  {object} newState - new state to merge
     * @return {object} state tree with merged blogs
     */
    const blogsKey = "Blogs";
    const currBlogs = state.get(blogsKey);
    const newBlogs = newState.get(blogsKey);
    if ( List.isList(currBlogs) && List.isList(newBlogs) ) {
        return state.set(blogsKey, currBlogs.concat(newBlogs));
    }
    else if ( !List.isList(currBlogs) && List.isList(newBlogs) ) {
        return state.set(blogsKey, newBlogs);
    }
    else {
        return state;
    }
}

export default function reducer(state = Map(), action) {
    switch (action.type) {
    case SET_BLOGS:
        return setBlogs(state, action.state);
    default:
        return state;
    }
}
