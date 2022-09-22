import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:3001';
// const httpClient = fetchUtils.fetchJson;

const httpClient = (url, options = {}) => {
    let data = JSON.parse(localStorage.getItem("auth"));

    options.headers = new Headers({ Accept: 'application/json' });
    options.headers.set('Authorization', 'Bearer ' + data.token)
    return fetchUtils.fetchJson(url, options);
};

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            console.log('headers', headers, 'json', json)
            return (
                {
                    //data: json,
                    data: json.Records.map((resource) => ({ ...resource, id: resource._id })),
                    // total: parseInt(headers.get('content-range').split('/').pop(), 10),
                    total: json.totalRecordsCount,
                })
        });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
            console.log('getOne json', json)
            let newjson = { ...json, id: json._id }
            delete newjson._id

            return ({
                data: newjson,
                //data: json.map((resource) => ({ ...resource, id: resource._id })),
            })
        }),

    getMany: (resource, params) => {
        console.log('get many')
        console.log('get many params.ids', params.ids)
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
            //filter: JSON.stringify(params.ids.map((id) => JSON.parse(id))),
        };
        console.log('get many query', query)
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // return httpClient(url).then(({ json }) => ({ data: json.map((resource) => ({ ...resource, id: resource._id })) }));
        return httpClient(url).then(({ header, json }) => ({
            //data: json,
            data: json.Records.map((resource) => ({ ...resource, id: resource._id })),
            // total: parseInt(headers.get('content-range').split('/').pop(), 10),
            total: json.totalRecordsCount,
        }));
    },

    getManyReference: (resource, params) => {
        console.log('get many reference')
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            // data: json,
            // data: json.map((resource) => ({ ...resource, id: resource._id })),
            // //total: parseInt(headers.get('content-range').split('/').pop(), 10),
            // total: json.length

            data: json.Records.map((resource) => ({ ...resource, id: resource._id })),
            // total: parseInt(headers.get('content-range').split('/').pop(), 10),
            total: json.totalRecordsCount,
        }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            console.log('[dataProvider] update json', json)
            let newjson = { ...json, id: json._id }
            delete newjson._id
            return ({ data: newjson })
        }),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
    // registerBallEvent: (id) => {
    //     console.log('registerBallEvent id', id)
    //     return fetch(`${apiUrl}/ballEvent/registerEvent/${id}`, { method: 'POST' })
    //         .then(response => response.json());
    // },
    registerBallEvent: (id) =>
        httpClient(`${apiUrl}/ballEvent/registerEvent/${id}`, {
            method: 'POST',
        }).then(({ json }) => ({ data: json })),

    registerBallEventBringBall: (id) =>
        httpClient(`${apiUrl}/ballEvent/registerBallEventBringBall/${id}`, {
            method: 'POST',
        }).then(({ json }) => ({ data: json }))

};