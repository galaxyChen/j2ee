import Vue from 'vue'
export default function ({$axios, redirect}) {
    $axios.onRequest(config => {
    })

    $axios.send = async function (data,URL,header) {
        console.log(data)
        // Vue.$message({
        //     message:'加载中'
        // })
        let url = '/BookStore/'
        if (URL!=undefined){
            url = URL
        }
        let Header = {}
        if (header!=undefined){
            Header = header
        }
    console.log(url)
        let request = await $axios
            .post(url, data,Header)
            .then((response) => {
                // console.log(response)
                return response.data
            })
            .catch((error) => {
                let response = {
                    status: 0,
                    err: {}
                }
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    response['err']['data'] = error.response.data;
                    response['err']['status'] = error.response.status;
                    response['err']['headers'] = error.response.headers;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    response['err'] = error.message;
                }
                return response;
            });
        return request;
    }

}