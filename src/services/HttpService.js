import axios from 'axios';
import to from 'await-to-js';
import jparam from 'jquery-param';

class HttpService {
    async authenticate(email, password) {
        let url = `${siteUrl}api/users/login`;

        try {
            let result = await axios.post(url, {
                Email: email,
                Password: password
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async getAllData(token, entity) {
        let url = `${siteUrl}api/${entity}`;

        try {
            let result = await axios.get(url, {
                headers: { Authorization: token }
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async getData(token, entity, queryObj) {
        let url = `${siteUrl}api/${entity}?${jparam(queryObj)}`;

        try {
            let result = await axios.get(url, {
                headers: { Authorization: token }
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async inserData(token, data, entity) {
        let url = `${siteUrl}api/${entity}`;

        try {
            let result = await axios.post(url, data, {
                headers: { Authorization: token }
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async updateData(token, data, id, entity) {
        let url = `${siteUrl}api/${entity}/${id}`;

        try {
            let result = await axios.put(url, data, {
                headers: { Authorization: token }
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async deleteData(token, id, entity) {
        let url = `${siteUrl}api/${entity}/${id}`;

        try {
            let result = await axios.delete(url, {
                headers: { Authorization: token }
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }
}

export default HttpService;
