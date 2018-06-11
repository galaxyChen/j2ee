import Vue from 'vue'

function sender(){
    let url = '';
    function send(data,success,error){
        axios({
            method: 'post',
            url: url,
            data: data
          }).then((response)=>{
              if (response.status==1){
                  success(response)
              } else {
                  error(response)
              }
          }).catch((err)=>{
              error(err)
          })

    }
    function test(){
        console.log('sender is now working!')
    }
    this.send = send
    this.test = test
}

let s = new sender()

let Sender = {
    install:function(Vue){
        Vue.prototype.$send = s.send;
        Vue.prototype.$sendTest = s.test;
    }
}

export default () => {
  Vue.use(Sender)
}
