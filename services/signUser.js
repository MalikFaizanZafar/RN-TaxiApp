import axios from "axios";

export default signUser = (userInfo, provider) => {
  return new Promise((resolve, reject) => {
    if(provider === "GOOGLE"){
      if(userInfo){
        console.log('userInfo(Google) has : ', userInfo)
        let googleUser = {
          socialId: userInfo.user.id,
          password: '1234',
          token: userInfo.accessToken,
          name : userInfo.user.name,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
          gender: 'male',
          birthday: '07-07-1995'
        }
        console.log('googleUser is : ', googleUser)
        axios.post('http://192.168.1.13:3000/api/auth/user', googleUser).then(res => {
          console.log('response from server is : ', res)
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
        let facebookUser = {
          socialId: userInfo.id,
          password: '1234',
          token: userInfo.accessToken,
          name : userInfo.name,
          email: userInfo.email,
          photo: userInfo.picture.data.url,
          gender: 'male',
          birthday: '07-07-1995'
        }
        console.log('facebookUser is : ', facebookUser)
        let graphAPI = `https://graph.facebook.com/v2.9/me?access_token=${facebookUser.token}&fields=gender,birthday,hometown%2Cage_range&method=get&pretty=0&sdk=joey&suppress_http_code=1`;
        axios.get(graphAPI).then(fbResponse => {
          console.log('fbResponse is : ', fbResponse)
        }).catch(err => console.log('graphReq is : ', err)) 

        axios.post('http://192.168.1.13:3000/api/auth/user', facebookUser).then(res => {
          console.log('response from server is : ', res)
          resolve(res)
        }).catch(error => {
          console.log('error is ', error)
          reject(error)
        })
      }
    }
  })
}