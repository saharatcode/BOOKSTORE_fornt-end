import axios from 'axios';
import localStorageService from '../services/localStorageService'
// import {notification} from 'antd'

axios.defaults.baseURL = "http://localhost:8000/api/";

//ทุกที่ ที่ axios ยิงไปให้แนบ token ไปด้วย
axios.interceptors.request.use(
    config => {
        if(config.url.includes("/login)") || config.url.includes("/register")) return config;

        const token = localStorageService.getToken(); 
        // console.log(token)  

        if(token) {
            config.headers["token"] = `Bearer ${token}`
            // config.headers["Authorization"] = `Bearer ${token}`
        }
        return config;
    },
    err => {
        Promise.reject(err)
    }
);

//เมื่อ token หมดอายุ ต้องให้ font-ent setRole เป็น guest
//เมื่อ font-end request หา back-end แล้ว back-end respone เป็น 401 font-end จะต้อง removed token ออก 
// 401 หมายถึง Unauthorized
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     err => {
//         if (err.response && err.request.status === 401){
//             localStorageService.removeToken();
//             window.location.reload(); // คำสั่งให้ Browser reload เพื่อให้ดึง Role มาใหม่ เมื่อ token ถูก remove ไปแล้ว setRole จะเป็น gest ทำให้ต้อง login ใหม่
//             notification.error({
//                 message: `กรุณาเข้าสู่ระบบใหม่`
//             });
//             return Promise.reject(err);
//         } //หรือ err.response?.status === 401 สำหรับ ES6
//         return Promise.reject(err);

//     }
// )

export default axios;