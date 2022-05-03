const axios = require("axios");

// Set config defaults when creating the instance
const api = axios.create({
    baseURL: 'http://localhost:8000/'
  });

  // Alter defaults after instance has been created
  if(localStorage.getItem("access")){
    instance.defaults.headers.common['Authorization'] = localStorage.getItem("access");
  }

  module.exports = api