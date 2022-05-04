import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("access")}`
    }
  });

export default api