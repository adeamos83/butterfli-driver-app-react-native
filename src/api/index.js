// Local Host Environment
var API_URL = 'http://localhost:3000';

// Local Iphone Device Server
// var API_URL = 'http://192.168.1.107:3000';

//Deployed Heroku Staging Server
// var API_URL = "https://lit-coast-94226.herokuapp.com";

exports.API_URL = `${API_URL}`;
exports.SIGNIN_URL = `${API_URL}/api/signin`;
exports.SIGNUP_URL = `${API_URL}/api/signup`;
exports.CREATE_PROFILE_URL = `${API_URL}/api/drivers`;
exports.MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYWRlYW1vczgzIiwiYSI6ImNqaWdic2ZvbDBiYzczcm54YzNwem1tMWYifQ.OEp7GdVv_W-9fxj6Ix9yzQ";
exports.GOOGLE_API_KEY = "AIzaSyDYndj5Gfh1rp5VUFHHu6gnN4vy2GQ0hvo";