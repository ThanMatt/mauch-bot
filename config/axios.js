const axios = require('axios').default

const API = axios.create({
  baseURL: process.env.API_SOURCE,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json'
  }
})

module.exports = API
