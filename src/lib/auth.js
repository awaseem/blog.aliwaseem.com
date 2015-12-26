import jwtDecode from "jwt-decode";
import tokenStorage from "./tokenStorage";
import endpoints from "../config/endpoints";
import { post } from "../util/request";

let checkAuth = () => {
    let token = tokenStorage.getToken();
    if (token) {
        let tokenExp = jwtDecode(token).exp;
        let currDate = Date.now() / 1000 | 0;
        // check to ensure that the token is much longer than an hour from
        // expiring, if it's not then re ask the user to re auth
        if (tokenExp && currDate < tokenExp && (tokenExp - currDate) >= 7200) {
            return true;
        }
    }
    return false;
};

let login = (username, password) => {
    return post(endpoints.signin, {
        username: username,
        password: password
    });
};


export { login, checkAuth };
