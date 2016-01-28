import { Map, fromJS } from "immutable";
import { BLOGS, IS_FETCHING, ERROR, ERROR_MESSAGE } from "../schema/stateTree";
import { getBlogs } from "../lib/blog";

export const SET_BLOGS = "SET_BLOGS";
export const GET_BLOGS = "GET_BLOGS";
export const SET_ERROR = "SET_ERROR";
export const COMPLETE_BLOGS = "COMPLETE_BLOGS";

export function setBlogsAction(blogPosts) {
    /**
     * Create action that handles the addition of the blog posts
     * @param: {array} BlogPosts - a list of blog posts
     * @return: action with payload of blog posts
     */
    const action = {
        type: SET_BLOGS
    };
    action.state = Map().set(BLOGS, fromJS(blogPosts));
    return action;
}

export function getBlogsAction() {
    /**
     * Create action that handles requesting of blog posts
     * @return: action with fetching flag set to true
     */
    const action = {
        type: GET_BLOGS
    };
    action.state = Map().set(IS_FETCHING, true);
    return action;
}

export function setErrorAction(message = "Unknown error has occured!") {
    /**
     * Create action that sets the error with message specified
     * @param: {string} message - error message to set
     * @return: action with proper error states filled
     */
    const action = {
        type: SET_ERROR
    };
    action.state = Map().set(ERROR, true).set(ERROR_MESSAGE, message).set(IS_FETCHING, false);
    return action;
}

export function completeBlogsAction() {
    /**
     * Create action that completes blogs fetching
     * @return: action with fetching set to false
     */
    const action = {
        type: COMPLETE_BLOGS
    };
    action.state = Map().set(IS_FETCHING, false);
    return action;
}

export function fetchBlogs(date = undefined, published = true) {
    return dispatch => {
        dispatch(getBlogsAction());
        return getBlogs(date, published)
                .then( blogData => {
                    dispatch(setBlogsAction(blogData));
                    dispatch(completeBlogsAction());
                })
                .catch(() => {
                    dispatch(setErrorAction("Failed to load blogs posts!"));
                });
    };
}

function shouldFetchBlogs(state) {
    const blogs = state.get(BLOGS);
    if (!blogs) {
        return true;
    }
    else {
        return false;
    }
}

export function fetchBlogsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchBlogs(getState())) {
            return dispatch(fetchBlogs());
        }
    };
}
