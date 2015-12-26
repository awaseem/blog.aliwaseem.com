let setToken = (tokenString) => {
    localStorage.setItem("blog-admin", tokenString);
};

let getToken = () => {
    return localStorage.getItem("blog-admin");
};

let deleteToken = () => {
    localStorage.removeItem("blog-admin");
};

export default {
    getToken: getToken,
    setToken: setToken,
    deleteToken: deleteToken
};
