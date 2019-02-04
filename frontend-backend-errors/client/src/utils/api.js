import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const handleGetData = () => {

  return new Promise((resolve, reject)=> {
    var token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    axios.get(`http://localhost:3000/todo/getalltodos/${decoded.id}`)
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  })

}

export const handleJWTExpiration = () => {
  return new Promise((resolve, reject) => {

    var token = localStorage.getItem('jwtToken');
    const currentTime = Date.now() / 1000;
    const decoded = jwt_decode(token);

    if (decoded.exp < currentTime) {
      localStorage.removeItem('jwtToken');
      reject(null)
    } else {
      resolve(token, decoded);
    }

  });
}