const { default: axios } = require("axios");
const { mapbox } = require("../config");
const ErrorResponse = require("../helpers/ErrorResponse");

class LocationService {
  constructor() {
    this.url = mapbox.url;
    this.apiKey = `?access_token=${mapbox.apiKey}`;
  }

  async search(keyword) {
    try {
      const querys = "&language=es";
      const res = await axios.get(
        `${this.url}${keyword}.json${this.apiKey}${querys}`
      );
      return res.data.features.map(e => {
        return {
          _id: e.id,
          place_name: e.place_name,
          text: e.text,
          latitude: e.geometry.coordinates[1],
          longitude: e.geometry.coordinates[0],
        };
      });
    } catch (error) {
      throw new ErrorResponse(
        error.response.status,
        undefined,
        error.response.statusText
      );
    }
  }
}

module.exports = new LocationService();
