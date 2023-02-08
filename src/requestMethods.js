import axios from "axios";
import localStorageService from "./services/localStorageService"
const BASE_URL = "http://localhost:8000/api/"
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmQ0OTQ1ZmMyNmMyYWQxMzVlZDljOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MzUyNDAwMSwiZXhwIjoxNjczNzgzMjAxfQ.RUPr08dZ6PJ0vCpMHjcVrYiOSVZBLIACbTU3MQW9jm8"
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken

// const TOKEN = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).TOKEN : null
const TOKEN = localStorage.getItem("ACCESS_TOKEN") ? localStorage.getItem("ACCESS_TOKEN") : null


// console.log( TOKEN )     
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).TOKEN)


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token: `Bearer ${TOKEN}`}
})

// export default TOKEN