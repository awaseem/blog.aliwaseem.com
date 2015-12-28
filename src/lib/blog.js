import tokenStorage from "./tokenStorage";
import endpoints from "../config/endpoints";
import { get, post, put } from "../util/request";

let getBlogs = () => {
    return get(endpoints.blog, {
        group: "test"
    });
};

let getBlog = (id) => {
    return get(`${endpoints.blog}/${id}`);
};

let saveBlog = (heading, body) => {
    return post(endpoints.blog, {
        token: tokenStorage.getToken(),
        heading: heading,
        body: body
    });
};

let updateBlog = (id, heading, body) => {
    return put(endpoints.blog, {
        token: tokenStorage.getToken(),
        id: id,
        heading: heading,
        body: body
    });
};

export { getBlogs, getBlog, saveBlog, updateBlog };
