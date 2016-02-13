import { Map, List } from "immutable";

export const BLOGS = "Blogs";

export const IS_FETCHING = "isFetching";

export const LAST_DATE = "lastDate";

export const SUCCESS = "success";

export const ERROR = "error";

export const ERROR_MESSAGE = "errorMessage";

export const ALL_BLOGS_LOADED = "allBlogsLoaded";

export const CURRENT_BLOG_VIEW = "currentBlogView";

export const ADMIN_TOKEN = "adminToken";

export const STATE_TREE = Map()
            .set(BLOGS, List())
            .set(IS_FETCHING, false)
            .set(LAST_DATE, "")
            .set(SUCCESS, false)
            .set(ERROR, false)
            .set(ERROR_MESSAGE, "")
            .set(ALL_BLOGS_LOADED, false)
            .set(CURRENT_BLOG_VIEW, Map())
            .set(ADMIN_TOKEN, "");
