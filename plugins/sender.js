import Vue from 'vue'
import axios from 'axios'


function sender() {
    // let url = 'http://localhost:3001';
    let url = 'http://192.168.43.185:8080/BookStore'
    async function send(data) {
        // console.log(data);
        let request = await axios({method: 'post', url: url, data: data}).then((response) => {
            // console.log(response)
            return response.data
        }).catch((error) => {
            let response = {
                status:0,
                err:{}
            }
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                response['err']['data']=error.response.data;
                response['err']['status']=error.response.status;
                response['err']['headers']=error.response.headers;
            } else {
                // Something happened in setting up the request that triggered an Error
                response['err'] = error.message;
            }
            return response;
        })
        return request;
    }

    function test() {
        console.log('sender is now working!')
    }
    this.send = send
    this.test = test
}

let s = new sender()

let Sender = {
    install: function (Vue) {
        Vue.prototype.$send = s.send;
        Vue.prototype.$sendTest = s.test;
    }
}

export default() => {
    Vue.use(Sender)
}
