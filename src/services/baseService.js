import axios from 'axios';
import { DOMAIN, TOKEN } from '../util/settings/config';

export class baseService {
    //put json về phía BE
    put = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer' + localStorage.getItem(TOKEN) }//JWT
        })
    }

    post = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer' + localStorage.getItem(TOKEN) }//JWT
        })
    }

    get = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            data: model,
            headers: { 'Authorization': 'Bearer' + localStorage.getItem(TOKEN) }//token yêu cầu backend chứng minh
        })
    }

    delete = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            data: model,
            headers: { 'Authorization': 'Bearer' + localStorage.getItem(TOKEN) }//JWT
        })
    }
}