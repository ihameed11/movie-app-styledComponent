import axios from "axios";

const baseApi= axios.create({
    baseURL:'https://api.themoviedb.org/3'}) 

const CRUDRequests={
    get:async (url)=>{
        return baseApi.get(url,{})
    },
    pist:async (url)=>{
        return baseApi.post(url,{},{})
    },
    delete:async (url)=>{
        return baseApi.delete(url,{},{})
    },
    post:async (url)=>{
        return baseApi.post(url,{},{})
    },
}
    export default CRUDRequests