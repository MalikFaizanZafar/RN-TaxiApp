import axios from "axios";

export default signUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    if(userInfo){
      // console.log('userInfo has : ', userInfo)
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
      // console.log('googleUser is : ', googleUser)
      axios.post('http://192.168.10.2:3000/api/auth/user', googleUser).then(res => {
        console.log('response from server is : ', res)
        resolve(res)
      }).catch(error => {
        console.log('error is ', error)
        reject(error)
      })

    }else {
      reject('We dont have the User info')
    }
  })
}