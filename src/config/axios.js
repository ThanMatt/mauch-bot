import axios from 'axios'

export default axios.create({
  baseURL: process.env.API_SOURCE,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json'
  }
})
