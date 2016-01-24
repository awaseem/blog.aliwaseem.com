import { Map, fromJS } from "immutable";
import { expect } from "chai";
import { setBlogsAction, getBlogsAction, setErrorAction } from "../src/actions/action";

import reducer from "../src/reducer/reducer";

describe("reducer", () => {

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
        expect(nextState).to.equal(fromJS({
            Blogs: [ dataPayload ],
            lastDate: "test date",
            isFetching: false
        }));
    });

    it("handles SET_BLOGS to return same state with inproper value", () => {
        const initialState = fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: false
        });
        const action = setBlogsAction("NOT_VALID_VALUE");
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: false
        }));
    });

    it ("handles SET_BLOGS to concat new blog entries", () => {
        const initialState = fromJS({
            Blogs: [
                {
                    heading: "test",
                    author: "test test",
                    body: "test",
                    group: "test",
                    createdOn: "test date",
                    published: true
                },
                {
                    heading: "test 1",
                    author: "test test 1",
                    body: "test 1",
                    group: "test 1",
                    createdOn: "test date 1",
                    published: false
                }
            ],
            lastDate: "test date 1",
            isFetching: false
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
        expect(nextState).to.equal(fromJS({
            Blogs: [
                {
                    heading: "test",
                    author: "test test",
                    body: "test",
                    group: "test",
                    createdOn: "test date",
                    published: true
                },
                {
                    heading: "test 1",
                    author: "test test 1",
                    body: "test 1",
                    group: "test 1",
                    createdOn: "test date 1",
                    published: false
                },
                {
                    heading: "test 2",
                    author: "test test 2",
                    body: "test 2",
                    group: "test 2",
                    createdOn: "test date 2",
                    published: true
                }
            ],
            lastDate: "test date 2",
            isFetching: false
        }));
    });

    it("handles SET_BLOGS with empty list as a nextState", () => {
        const initialState = fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: false
        });
        const action = setBlogsAction([]);
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: false
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
        const initialState = fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: false
        });
        const action = getBlogsAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: true
        }));
    });

    it("handles SET_ERROR", () => {
        const initialState = Map();
        const action = setErrorAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            error: true,
            errorMessage: "Unknown error has occured!",
            isFetching: false
        }));
    });

    it("handles SET_ERROR with proper initial state data", () => {
        const initialState = fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: true,
            error: false,
            errorMessage: ""
        });
        const action = setErrorAction();
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            Blogs: [ {
                heading: "test",
                author: "test test",
                body: "test",
                group: "test",
                createdOn: "test date",
                published: true
            } ],
            lastDate: "test date",
            isFetching: false,
            error: true,
            errorMessage: "Unknown error has occured!"
        }));
    });

});
