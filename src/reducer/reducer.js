import { Map, List } from "immutable";
import { BLOGS, LAST_DATE, IS_FETCHING } from "../schema/stateTree";
import { SET_BLOGS } from "../actions/action";

function setBlogs(state, newState) {
    /**
     * Immutable js has a merge method which can combine two objects being
     * passed in.
     * @param {object} state - current state tree
     * @param  {object} newState - new state to merge
     * @return {object} state tree with merged blogs
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

export default function reducer(state = Map(), action) {
    switch (action.type) {
    case SET_BLOGS:
        return setBlogs(state, action.state);
    default:
        return state;
    }
}
