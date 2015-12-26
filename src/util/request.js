let statusMiddleware = (response) => {
    if (response.status >= 200 && response.status < 300) {
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

let post = (url, jsonData, Auth) => {
    return fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": Auth
        },
        body: JSON.stringify(jsonData)
    })
        .then(statusMiddleware)
        .then(jsonResponseMiddleware);
};

export { post };
