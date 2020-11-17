export class Http {

    static async get(url) {
        try {
            return await request(url);
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    static async post(url, data= {}) {
        try {
            return await request(url, 'POST', data);
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    static async delete(url) {
        try {
            return await request(url, 'DELETE');
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    static async patch(url, data= {}) {
        try {
            return await request(url, 'PATCH', data);
        } catch (e) {
            console.log(e);
            throw e
        }
    }
}

async function request(url, method = 'GET', data) {
    const headers = {
        'Content-Type': 'application/json'
    };

    const config = {
        method,
        headers,
    }

    if (method === "POST" || method === "PATCH") {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    return await response.json();
}