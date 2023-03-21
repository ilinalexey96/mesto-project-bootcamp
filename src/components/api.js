const config = {
    baseUrl: "https://nomoreparties.co/v1/wbf-cohort-6",
    headers: {
        authorization: "8803b5aa-7ed5-49cc-bcf8-0cd27be600b0",
        "Content-Type": 'application/json',
    },
};

export function handleBasicResponse(res) {
    if (!res.ok) {
        return Promise.reject(res.status);
    }
    return res.json();
}

export function handleError(err) {
    console.error(`Ошибка: ${err}`)
}

export function postNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    })
    .then(handleBasicResponse);
}

export function updateProfileData(userName, userAbout) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userAbout,
        }),
    })
    .then(handleBasicResponse);
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(handleBasicResponse);
}

export function getProfileData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(handleBasicResponse);
}

export function updateProfileAvatar(src) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH", 
        headers: config.headers,
        body: JSON.stringify({
            avatar: src,
        }),
    })
    .then(handleBasicResponse);
}

export function removeApiCard(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(handleBasicResponse);
}

export function addLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(handleBasicResponse);
}

export function deleteLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: "DELETE", 
        headers: config.headers,
    })
    .then(handleBasicResponse);
}