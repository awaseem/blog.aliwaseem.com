import { Map, fromJS, List } from "immutable";
import { expect } from "chai";
import {
    setBlogsAction,
    getBlogsAction,
    setErrorAction,
    completeBlogsAction,
    allBlogsLoadedAction,
    setCurrentViewAction,
    setAdminToken,
    setSuccessAction
} from "../src/actions/action";

import reducer from "../src/reducer/reducer";

describe("reducer spec", () => {

    it("handles SET_BLOGS", () => {
        const initialState = Map();
        const dataPayload = {
            heading: "test",
            author: "test test",
            body: "test",
            group: "test",
            createdOn: "test date",
            published: true
        };
        const action = setBlogsAction([ dataPayload ]);
        const nextState = reducer(initialState, action);
        const expectedValue = Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date"
        });
        expect(nextState).to.equal(expectedValue);
    });

    it("handles SET_BLOGS to return same state with inproper value", () => {
        const initialState = Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: false
        });
        const action = setBlogsAction("NOT_VALID_VALUE");
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: false
        }));
    });

    it ("handles SET_BLOGS to concat new blog entries", () => {
        const initialState = Map({
            Blogs: List([
                Map({
                    heading: "test",
                    author: "test test",
                    body: "test",
                    group: "test",
                    createdOn: "test date",
                    published: true
                }),
                Map({
                    heading: "test 1",
                    author: "test test 1",
                    body: "test 1",
                    group: "test 1",
                    createdOn: "test date 1",
                    published: false
                })
            ]),
            lastDate: "test date 1",
            isFetching: true
        });
        const action = setBlogsAction([ {
            heading: "test 2",
            author: "test test 2",
            body: "test 2",
            group: "test 2",
            createdOn: "test date 2",
            published: true
        } ]);
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([
                Map({
                    heading: "test",
                    author: "test test",
                    body: "test",
                    group: "test",
                    createdOn: "test date",
                    published: true
                }),
                Map({
                    heading: "test 1",
                    author: "test test 1",
                    body: "test 1",
                    group: "test 1",
                    createdOn: "test date 1",
                    published: false
                }),
                Map({
                    heading: "test 2",
                    author: "test test 2",
                    body: "test 2",
                    group: "test 2",
                    createdOn: "test date 2",
                    published: true
                })
            ]),
            lastDate: "test date 2",
            isFetching: true
        }));
    });

    it("handles GET_BLOGS", () => {
        const initialState = Map();
        const action = getBlogsAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            isFetching: true
        }));
    });

    it("handles GET_BLOGS to change fetching state", () => {
        const initialState = Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: false
        });
        const action = getBlogsAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true
        }));
    });

    it("handles SET_ERROR", () => {
        const initialState = Map();
        const action = setErrorAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            error: true,
            errorMessage: "Unknown error has occured!",
            isFetching: false
        }));
    });

    it("handles SET_ERROR with proper initial state data", () => {
        const initialState = Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true,
            error: false,
            errorMessage: ""
        });
        const action = setErrorAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: false,
            error: true,
            errorMessage: "Unknown error has occured!"
        }));
    });

    it("handles COMPLETE_BLOGS", () => {
        const initialState = Map();
        const action = completeBlogsAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            isFetching: false
        }));
    });

    it("handles COMPLETE_BLOGS to change fetching state", () => {
        const initialState = Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true
        });
        const action = completeBlogsAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: false
        }));
    });

    it("handles ALL_BLOGS_LOADED to change blog state", () => {
        const initialState = Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true,
            allBlogsLoaded: false
        });
        const action = allBlogsLoadedAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true,
            allBlogsLoaded: true
        }));
    });

    it("handles SET_CURRENT_BLOG_VIEW to set the current blog state", () => {
        const blogData =  Map({
            heading: "test",
            author: "test test",
            body: "test",
            group: "test",
            createdOn: "test date",
            published: true
        });
        const initialState = Map({
            Blogs: List([ blogData ]),
            lastDate: "test date",
            isFetching: true,
            allBlogsLoaded: false
        });
        const action = setCurrentViewAction(blogData);
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true,
            allBlogsLoaded: false,
            currentBlogView: blogData
        }));
    });

    it("handles SET_CURRENT_BLOG_VIEW to overide a current blog view", () => {
        const initialState = Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true,
            allBlogsLoaded: false,
            currentBlogView: Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            })
        });
        const blogData =  Map({
            heading: "test 1",
            author: "test test 2",
            body: "test 1",
            group: "test 1",
            createdOn: "test date 1",
            published: true
        });
        const action = setCurrentViewAction(blogData);
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            Blogs: List([ Map({
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            }) ]),
            lastDate: "test date",
            isFetching: true,
            allBlogsLoaded: false,
            currentBlogView: blogData
        }));
    });

    it("handles SET_ADMIN_TOKEN", () => {
        const initialState = Map();
        const action = setAdminToken("this is a test token");
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            adminToken: "this is a test token"
        }));
    });

    it("handles SET_ADMIN_TOKEN when already set", () => {
        const initialState = Map({
            adminToken: "not a test"
        });
        const action = setAdminToken("this is a test token");
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            adminToken: "this is a test token"
        }));
    });

    it("handles SET_SUCCESS", () => {
        const initialState = Map();
        const action = setSuccessAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            success: true
        }));
    });

});
