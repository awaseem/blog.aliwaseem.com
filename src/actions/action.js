import { Map, fromJS } from "immutable";
import { BLOGS } from "../schema/stateTree";

export const SET_BLOGS = "SET_BLOGS";

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
