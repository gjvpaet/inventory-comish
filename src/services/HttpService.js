import axios from 'axios';
import to from 'await-to-js';
import jparam from 'jquery-param';

class HttpService {
    async getAllData(token, entity) {
        let url = `${siteUrl}api/${entity}`;

        try {
            let result = await axios.get(url, {
                headers: { Authorization: token }
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw err;
        }
    }

    async inserData(token, data, entity) {
        let url = `${siteUrl}api/${entity}`;

        try {
            let result = await axios.post(url, data, {
                headers: { Authorization: token }
            });
            console.log(result.data);
            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw err;
        }
    }
}

export default HttpService;
