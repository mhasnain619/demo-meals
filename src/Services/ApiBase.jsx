const ExecuteGet = async (url) => {
    return await fetch(url, {
        method: 'GET',
        redirect: 'follow',
    })
        .then(response => response.text())
        .then(result => {
            return JSON.parse(result);
        })
        .catch(error => {
            return error;
        });
};

export {
    ExecuteGet,

}