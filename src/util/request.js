import $ from "jquery";

let statusMiddleware = (response) => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

let jsonResponseMiddleware = (response) => {
    return response.json();
};

let get = (url, jsonData) => {
    let urlQuery = jsonData ? $.param(jsonData) : "";
    url = url + "?" + urlQuery;
    return fetch(url, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

let post = (url, jsonData) => {
    return fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

let put = (url, jsonData) => {
    return fetch(url, {
        method: "put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

let remove = (url, jsonData) => {
    return fetch(url, {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

export { get, post, put, remove };
