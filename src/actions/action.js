import { Map, fromJS, List } from "immutable";
import { BLOGS, IS_FETCHING, ERROR, ERROR_MESSAGE, ALL_BLOGS_LOADED, CURRENT_BLOG_VIEW } from "../schema/stateTree";
import { getBlogs } from "../lib/blog";

export const SET_BLOGS = "SET_BLOGS";
export const GET_BLOGS = "GET_BLOGS";
export const SET_ERROR = "SET_ERROR";
export const COMPLETE_BLOGS = "COMPLETE_BLOGS";
export const SET_CURRENT_BLOG_VIEW = "SET_CURRENT_BLOG_VIEW";

export function setBlogsAction(blogPosts) {
    /**
     * Create action that handles the addition of the blog posts
     * @param: {array} BlogPosts - a list of blog posts
     * @return: action with payload of blog posts
     */
    const action = {
        type: SET_BLOGS
    };
    if (Array.isArray(blogPosts)) {
        action.state = Map().set(BLOGS, fromJS(blogPosts));
    }
    else {
        action.state = Map().set(BLOGS, List());
    }
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

export function allBlogsLoadedAction(state = true) {
    /**
     * @param: {boolean} state of the all blogs loaded state within the tree
     * @return: action with all blogs state set to true by default
     */
    const action = {
        type: ALL_BLOGS_LOADED
    };
    action.state = Map().set(ALL_BLOGS_LOADED, state);
    return action;
}

export function setCurrentViewAction(blogData = {}) {
    /**
     * Create action that sets the current view
     * @param: {object} blogData to set as current view
     * @return: action with current view set
     */
    const action = {
        type: SET_CURRENT_BLOG_VIEW
    };
    action.state = Map().set(CURRENT_BLOG_VIEW, fromJS(blogData));
    return action;
}

export function fetchBlogs(date = undefined, published = true) {
    return dispatch => {
        dispatch(getBlogsAction());
        return getBlogs(date, published)
                .then( blogData => {
                    if (Array.isArray(blogData) && blogData.length !== 0) {
                        dispatch(setBlogsAction(blogData));
                    }
                    else {
                        dispatch(allBlogsLoadedAction());
                    }
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
