import axios from 'axios';

const FAIL_CODES = new Set([408, 500, 502, 503, 504, 522, 524]);

export const Retry = {
    async getURL(url, retries=3, backoff=300) {
        try {
            return await axios.get(url);
        } catch (e) {
            if (retries > 0 && FAIL_CODES.has(e.response.status)) {
                setTimeout(() => {
                    return Retry.getURL(url, retries - 1, backoff * 2)
                }, backoff)
            } else {
                console.log(`There was an error making the request: ${e}`);
                return e;
            }
        }
    }
};