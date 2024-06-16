import * as process from 'process';

export class RestAPI {

    // @ts-ignore
    baseURL: string = process.env.REACT_APP_REST_API_URL;

    async get(endpoint: string): Promise<any> {
        console.log(this.baseURL)
        const response = await fetch(`${this.baseURL}${endpoint}`,{
            method: 'GET',
            headers:{
                'token': localStorage.getItem('token') || '',
            }
    });
        return response.json();
    }

    async post(endpoint: string, body: any): Promise<any> {
        return await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token') || '',
            },
            body:body
        });
    }

    async put(endpoint: string, body: any): Promise<any> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || '',

            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    async delete(endpoint: string): Promise<any> {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'DELETE',
                headers:{
                    'token': localStorage.getItem('token') || '',
                    'Content-Type': 'application/json',
                }
            });
            return response;
    }

    // Similarly, you can add PUT, DELETE methods etc.
}
export const api = new RestAPI();

// Usage