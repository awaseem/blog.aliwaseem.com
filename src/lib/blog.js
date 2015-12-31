import tokenStorage from "./tokenStorage";
import endpoints from "../config/endpoints";
import { get, post, put, remove } from "../util/request";

let getBlogs = (date, published) => {
    return get(endpoints.blog, {
        group: "test",
        date: date,
        published: published
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

let publishBlog = (id, publishStatus) => {
    return put(endpoints.blog, {
        token: tokenStorage.getToken(),
        id: id,
        published: publishStatus
    });
};

let removeBlog = (id) => {
    return remove(endpoints.blog, {
        token: tokenStorage.getToken(),
        id: id
    });
};

export { getBlogs, getBlog, saveBlog, updateBlog, removeBlog, publishBlog };
