export async function postRequest(url, query, headers) {
    if (!headers) headers = {
        "Content-Type": "application/json"
    }

    return parseResponse(await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: query,
    }));
}


export async function getRequest(url, headers) {
    if (!headers) headers = {"Content-Type": "application/json"}

    return parseResponse(await fetch(url, {
        method: "GET",
        headers: headers,
    }));
}


export async function putRequest(url, query, headers) {
    if (!headers) headers = {"Content-Type": "application/json"}

    return parseResponse(await fetch(url, {
        method: "PUT",
        headers: headers,
        body: query,
    }));
}


export async function deleteRequest(url, query, headers) {
    if (!headers) headers = {"Content-Type": "application/json"}

    return parseResponse(await fetch(url, {
        method: "DELETE",
        headers: headers,
        body: query,
    }));
}


// Converts the response to a json object if possible,
// otherwise returns the response as is.
const parseResponse = async (response) => {
    try {
        return response.json();
    } catch {
        return response;
    }
}