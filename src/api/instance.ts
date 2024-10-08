import axios from "axios"

export const api = axios.create({
    baseURL: "https://api.weatherapi.com/v1"
})

api.interceptors.request.use(function (config) {
    config.params = {
        ...config.params,
        key: "05933bad10944eaf9f245538241608",
        q: !config.params.q
            ? localStorage.getItem("userCity")
            : config.params.q,
        lang: "ru"
    }
    return config
})
