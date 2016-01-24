import { Map, fromJS } from "immutable";

export const SET_BLOGS = "SET_BLOGS";

export function setBlogsAction(blogPosts) {
    /**
     * Create action that handles the addition of the blog posts
     * @param: {array} BlogPosts - a list of blog posts
     * @return: action with payload of blog posts
     */
    return {
        type: SET_BLOGS,
        state: Map({
            Blogs: fromJS(blogPosts)
        })
    };
}
