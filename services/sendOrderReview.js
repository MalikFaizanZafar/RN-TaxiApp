import axios from 'axios'
import { getUser } from './getUser';
import { SERVER_URL } from '../constants';
const URL = SERVER_URL
export const sendOrderReview = (orderId, review, rating) => {
  return new Promise((resolve, reject) => {
    getUser().then(user => {
      let orderReview = {
        userId: user.userId,
        orderId: orderId,
        orderReview: review,
        orderStar: rating
      }
      axios.post(`${URL}/api/order/review`, orderReview).then(orderReviewResponse => {
        resolve(orderReviewResponse)
      }).catch(orderReviewError => {
        reject(orderReviewError)
      })
    })
  })
}