import { Map, fromJS, List } from "immutable";
import { BLOGS, IS_FETCHING, ERROR, ERROR_MESSAGE, ALL_BLOGS_LOADED, CURRENT_BLOG_VIEW, ADMIN_TOKEN, SUCCESS } from "../schema/stateTree";
import { getBlogs, getBlog, updateBlog, saveBlog } from "../lib/blog";
import { login } from "../lib/auth";
import tokenStorage from "../lib/tokenStorage";

export const SET_BLOGS = "SET_BLOGS";
export const GET_BLOGS = "GET_BLOGS";
export const SET_ERROR = "SET_ERROR";
export const COMPLETE_BLOGS = "COMPLETE_BLOGS";
export const ARE_ALL_BLOGS_LOADED = "ARE_ALL_BLOGS_LOADED";
export const SET_CURRENT_BLOG_VIEW = "SET_CURRENT_BLOG_VIEW";
export const SET_ADMIN_TOKEN = "SET_ADMIN_TOKEN";
export const SET_SUCCESS = "SET_SUCCESS";

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

export function setErrorAction(message = "Unknown error has occured!", errorState = true) {
    /**
     * Create action that sets the error with message specified
     * @param: {string} message - error message to set
     * @param: {boolean} errorState - boolean state for the error message
     * @return: action with proper error states filled
     */
    const action = {
        type: SET_ERROR
    };
    action.state = Map().set(ERROR, errorState).set(ERROR_MESSAGE, message).set(IS_FETCHING, false);
    return action;
}

export function setSuccessAction(successState = true) {
    /**
     * Create action that sets the success
     * @param: {boolean} successState - success boolean
     * @return: action with proper error states filled
     */
    const action = {
        type: SET_SUCCESS
    };
    action.state = Map().set(SUCCESS, successState);
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
        type: ARE_ALL_BLOGS_LOADED
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

export function setAdminToken(adminToken = "") {
    /**
     * Create action that sets the jwt token
     * @param: {string} admin token
     * @return: action with admin token set
     */
    const action = {
        type: SET_ADMIN_TOKEN
    };
    action.state = Map().set(ADMIN_TOKEN, adminToken);
    return action;
}

function findBlogById(blogs, id) {
    for (const blog of blogs) {
        if (blog.get("_id") === id) {
            return blog;
        }
    }
    return undefined;
}

export function signInAdmin(username = "", password = "", cb = () => "") {
    return (dispatch) => {
        return login(username, password)
                .then( userToken => {
                    dispatch(setAdminToken(userToken.token));
                    tokenStorage.setToken(userToken.token);
                    cb();
                })
                .catch(() => {
                    dispatch(setErrorAction("Failed to login user!"));
                });
    };
}

export function updateBlogById(blogId, heading, body) {
    return (dispatch) => {
        return updateBlog(blogId, heading, body)
            .then( () => {
                dispatch(setSuccessAction());
            })
            .catch(() => {
                dispatch(setErrorAction(`Failed to update blog!`));
            });
    };
}

export function createBlog(heading, body) {
    return (dispatch) => {
        return saveBlog(heading, body)
            .then( blogData => {
                dispatch(setCurrentViewAction(blogData.data));
                dispatch(setSuccessAction());
            })
            .catch(() => dispatch(setErrorAction(`Failed to update blog!`)) );
    };
}

export function fetchBlogById(id) {
    return (dispatch, getState) => {
        dispatch(getBlogsAction());
        const blog = findBlogById(getState().get("Blogs"), id);
        if (!blog) {
            return getBlog(id)
                    .then( blogData => {
                        dispatch(setCurrentViewAction(blogData));
                        dispatch(completeBlogsAction());
                    })
                    .catch(() => {
                        dispatch(setErrorAction(`Failed to find blog with the following id: ${id}`));
                    });
        }
        dispatch(setCurrentViewAction(blog));
        dispatch(completeBlogsAction());
        return blog;
    };
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
    if (blogs.isEmpty()) {
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
