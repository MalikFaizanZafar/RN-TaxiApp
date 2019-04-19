import axios from "axios";

export default signUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    if(userInfo.provider === "GOOGLE"){
      if(userInfo){
        axios.post('http://192.168.10.2:8000/api/auth/user', userInfo).then(res => {
          resolve(res)
        }).catch(error => {
          console.log('error is ', error)
          reject(error)
        })
  
      }else {
        reject('We dont have the User info')
      }
    }
    else{
      if(userInfo){
        let graphAPI = `https://graph.facebook.com/v2.9/me?access_token=${userInfo.token}&fields=gender,birthday,hometown%2Cage_range&method=get&pretty=0&sdk=joey&suppress_http_code=1`;
        axios.get(graphAPI).then(fbResponse => {
          // console.log('fbResponse is : ', fbResponse)
        }).catch(err => console.log('graphReq is : ', err)) 

        axios.post('http://192.168.10.2:8000/api/auth/user', userInfo).then(res => {
          // console.log('response from server is : ', res)
          resolve(res)
        }).catch(error => {
          console.log('error is ', error)
          reject(error)
        })
      }
    }
  })
}