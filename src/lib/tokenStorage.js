let token = "";

let getToken = function () {
    return token;
};

let setToken = function (value) {
    token = value;
};

export default {
    getToken: getToken,
    setToken: setToken
};
