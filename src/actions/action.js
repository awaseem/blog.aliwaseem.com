import { Map, fromJS } from "immutable";
import { BLOGS, IS_FETCHING } from "../schema/stateTree";

export const SET_BLOGS = "SET_BLOGS";
export const GET_BLOGS = "GET_BLOGS";

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
     * @return action with fetching flag set to true
     */
    const action = {
        type: GET_BLOGS
    };
    action.state = Map().set(IS_FETCHING, true);
    return action;
}
