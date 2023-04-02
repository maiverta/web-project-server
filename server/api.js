const axios = require("axios");
const Commercial = require("./models/CommercialModel");

const encodedParams = new URLSearchParams();
encodedParams.append("language", "en_US");
encodedParams.append("limit", "100");
encodedParams.append("location_id", "297704");
encodedParams.append("currency", "USD");

const options = {
  method: 'POST',
  url: 'https://worldwide-restaurants.p.rapidapi.com/search',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'b85c5cd0e3msh22d52ab4b3a187cp175cb8jsna9f5e1e7a2d2',
    'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
  },
  data: encodedParams
};

exports.getApiData =   async function ()  {
  
  const response =  await axios.request(options);
  // console.log(response.data.results.data)
  const commercials =  response.data.results.data.map((com)=>{
    return {
      name: com.name,
      description: com.description,
      numberOfReviews: com.num_reviews,
      imageLink: com.photo.images.medium.url
    }
  });
  console.log(commercials)
  await Commercial.insertMany(commercials)

}