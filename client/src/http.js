import axios from "axios";
import { Loading , Message } from "element-ui";

let loading;
function startLoading(){
    loading=Loading.service({
        lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
    });
}
function endLoading(){
    loading.close();
}
// 请求拦截
axios.interceptors.request.use(config => {
        startLoading();
        return config;
    }, error => {
        // 对请求错误做些什么
        Message('服务器内部错误');
        return Promise.reject(error);
    });

// 响应拦截
axios.interceptors.response.use(response => {
        endLoading();
        return response;
    }, error => {
        endLoading();
        Message(error.response.data);
        return Promise.reject(error);
    })

export default axios;