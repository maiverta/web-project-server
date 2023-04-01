const axios = require("axios");
const Commercial = require('./models/commercialModel');


const encodedParams = new URLSearchParams();
encodedParams.append("language", "en_US");
encodedParams.append("limit", "30");
encodedParams.append("location_id", "297704");
encodedParams.append("currency", "USD");

const options = {
  method: 'POST',
  url: 'https://worldwide-restaurants.p.rapidapi.com/search',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '3c73ed7ccemsh5c157408c8e8daep185c9bjsnad5675776d40',
    'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
  },
  data: encodedParams
};

exports.getApiData =   async function ()  {
  
  // const response =  await axios.request(options);
  // // console.log(response.data.results.data)
  // const commercials =  response.data.results.data.map((com)=>{
  //   return {
  //     name: com.name,
  //     description: com.description,
  //     numberOfReviews: com.num_reviews,
  //     imageLink: com.photo.images.medium.url
  //   }
  // });
  // console.log(commercials)
  // await Commercial.insertMany(commercials)

}