const axios = require("axios").default;

const ErrorResponse = require("../helpers/ErrorResponse");
const { hotels } = require("../config");

class HotelService {
  constructor(params) {
    // prettier-ignore
    this._url = hotels.url,
    this._querys = {
      latitude: params.latitude,
      longitude: params.longitude,
      checkin_date: params.checkin_date,
      checkout_date: params.checkout_date,
      sort_order: params.sort_order || "STAR_RATING_HIGHEST_FIRST",
      price_max: params.price_max,
      price_min: params.price_min,
      star_rating_ids: params.star_rating_ids,
      adults_number: params.adults_number || "1",
      children_ages: params.children_ages,
      amenity_ids: params.amenity_ids,
      theme_ids: params.theme_ids,
      accommodation_ids: params.accommodation_ids,
      guest_rating_min: params.guest_rating_min,
      page_number: params.page_number || "1",
      currency: params.currency || "USD",
      locale: params.locale || "es_ES",
      hotel_id: params.hotel_id,
    };

    this._filterQuerys = Object.entries(this._querys).filter(e => {
      if (e[1] !== "" && e[1] !== undefined) {
        return e;
      }
    });

    this._headers = {
      "x-rapidapi-key": hotels.key,
      "x-rapidapi-host": hotels.host,
    };

    this._stringifyQuery = new URLSearchParams(this._filterQuerys).toString();
  }

  async getList() {
    try {
      const res = await axios.get(
        this._url + "/nearby?" + this._stringifyQuery,
        { headers: this._headers }
      );

      return res.data.searchResults.results;
    } catch (error) {
      throw new ErrorResponse(
        error.response.status,
        undefined,
        error.response.data.detail
      );
    }
  }

  async getById() {
    try {
      const res = await axios.get(`${this._url}/booking-details`, {
        params: { ...this._querys },
        headers: { ...this._headers },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw new ErrorResponse(
        error.response.status,
        error.response.message,
        error.response.statusText
      );
    }
  }

  async getPhotoById() {
    try {
      const res = await axios.get(
        this._url + "/photos?" + this._stringifyQuery,
        { headers: this._headers }
      );

      return res.data;
    } catch (error) {
      throw new ErrorResponse(
        error.response.status,
        undefined,
        error.response.data.detail
      );
    }
  }

  async getReviewsById() {
    try {
      const res = await axios.get(
        this._url + "/reviews?" + this._stringifyQuery,
        { headers: this._headers }
      );

      return res.data;
    } catch (error) {
      throw new ErrorResponse(
        error.response.status,
        undefined,
        error.response.data.detail
      );
    }
  }
}

module.exports = HotelService;
