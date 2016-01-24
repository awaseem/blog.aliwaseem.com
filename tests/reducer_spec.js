import { Map, fromJS } from "immutable";
import { expect } from "chai";
import { setBlogsAction } from "../src/actions/action";

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

});
