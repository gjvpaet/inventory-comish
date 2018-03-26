import axios from 'axios';
import to from 'await-to-js';
import jparam from 'jquery-param';

class HttpService {
    async getAllData(token, entity) {
        let result, err;
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
}

export default HttpService;
