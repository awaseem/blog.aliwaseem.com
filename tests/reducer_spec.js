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
            published: true
        };
        const action = setBlogsAction([ dataPayload ]);
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            Blogs: [ dataPayload ]
        }));
    });

    
});
