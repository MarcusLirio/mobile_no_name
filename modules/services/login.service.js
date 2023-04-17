import axios from "axios";

const url = 'http://45.35.104.131:3009'

export async function LoginServices(params){
    const result = await axios.get(`${url}/users/login`, {params})
    .then((response) => response.data)
    .catch((error) => error)
    return result
}