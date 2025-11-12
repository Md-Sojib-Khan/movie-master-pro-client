import axios from "axios";


const axiosInstance = axios.create({
    baseURL:'https://movie-master-pro-api-server.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
}

export default useAxios