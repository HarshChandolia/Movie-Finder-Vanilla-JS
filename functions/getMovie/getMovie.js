const fetch = require("node-fetch");
// const axios = require('axios');

// exports.handler = function(event, context, callback) {
const handler = async (event, context, callback) => {
  // console.log("Is this working?");

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify("Is this working?")
  // }
 
  const {filledInput, nameInd} = event.queryStringParameters
 
  const API_SECRET = process.env.API_SECRET;
  let url;
  if (nameInd) {
      url = `http://www.omdbapi.com/?apikey=${API_SECRET}&t=${filledInput}`;
  } else {
      url = `http://www.omdbapi.com/?apikey=${API_SECRET}&i=${filledInput}`;
  }

//   // Send response
//   const send = body => {
//     callback(null, {
//       statusCode: 200,
//       body: JSON.stringify(body)
//     });
//   }

//   // Perform API call
//   const getUsers = () => {
//     axios.get(url)
//       .then(res => send(res.data))
//       .catch(err => send(err));
//   }

//   // Make sure method is GET
//   if (event.httpMethod == 'GET') {
//     // Run
//     getUsers();
//   }
// }

  try {
    const movie = await fetch(url);
    
    const movieData = await movie.json();

    return {
      statusCode: 200,
      body: JSON.stringify(movieData)
    }
  } catch (error) {
      // const { status, statusText, headers, data } = error.response
      return { 
        statusCode: 500, 
        body: JSON.stringify("The program did not work.")
      }
  }
}

module.exports = { handler }
