const { default: axios } = require("axios");
const { mapbox } = require("../config");

class LocationService {
  constructor() {
    this.url = mapbox.url;
    this.apiKey = `?access_token=${mapbox.apiKey}`;
  }

  async search(keyword) {
    const res = await axios.get(`${this.url}${keyword}${this.apiKey}`);
    console.log(res.data);
  }
}

module.exports = new LocationService();
