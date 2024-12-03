import axios from 'axios';

const getCookie = (name:string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

const createInstance = () => {
    const session = axios.defaults.headers.common['Authorization']
    console.log("Session:", session)
    return axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        }  
    })

}
export const fetcher = createInstance();