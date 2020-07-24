import axios from 'axios'

const ecommerce = axios.create({
  baseURL: 'http://localhost:3000'
})

export default ecommerce
