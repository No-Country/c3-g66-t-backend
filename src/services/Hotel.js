const ErrorResponse = require("../helpers/ErrorResponse");
const axios = require("axios").default;

class HotelService {
  constructor() {
    // prettier-ignore
    this.url = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/",
    this._querys = {
      latitude: "-22.911",
      longitude: "-43.2094",
      checkin_date: "2022-03-26",
      checkout_date: "2022-03-27",
      sort_order: "STAR_RATING_HIGHEST_FIRST",
      //price_max: params.price_max,
      //price_min: params.price_min,
      //star_rating_ids,
      adults_number: "1",
      //children_ages: params.children_ages,
      //amenity_ids: params.amenity_ids,
      //theme_ids: params.theme_ids,
      //accommodation_ids: params.accommodation_ids,
      //guest_rating_min: params.guest_rating_min,
      page_number: "1",
      currency: "USD",
      locale: "es_ES",
    };

    this._clearQuerys();
  }

  async getList(params) {
    this._querys.latitude = params.latitude;
    this._querys.longitude = params.longitude;
    this._querys.checkin_date = params.checkin_date;
    this._querys.checkout_date = params.checkout_date;
    this._querys.sort_order = params.sort_order;
    this._querys.adults_number = params.adults_number;
    this._querys.page_number = params.page_number;
    this._querys.currency = params.currency;
    this._querys.locale = params.locale;

    const querys = new URLSearchParams(this._querys).toString();

    try {
      const res = await axios.get(this.url + "nearby?" + querys, {
        headers: { "x-rapidapi-key": process.env.API_KEY },
      });

      return res.data.searchResults.results;
    } catch (error) {
      throw new ErrorResponse(
        error.response.status,
        error.response.message,
        error.response.statusText
      );
    }
  }

  async getPhotoById(params) {
    this._querys.hotel_id = params.hotel_id || "523378112";

    const querys = new URLSearchParams(this._querys).toString();

    try {
      const res = await axios.get(this.url + "photos?" + querys, {
        headers: { "x-rapidapi-key": process.env.API_KEY },
      });

      return res.data;
    } catch (error) {
      throw new ErrorResponse(
        error.response.status,
        error.response.message,
        error.response.statusText
      );
    }
  }

  async getReviewsById(params) {
    this._querys.hotel_id = params.hotel_id || "523378112";

    const querys = new URLSearchParams(this._querys).toString();

    try {
      const res = await axios.get(this.url + "reviews?" + querys, {
        headers: { "x-rapidapi-key": process.env.API_KEY },
      });

      return res.data;
    } catch (error) {
      throw new ErrorResponse(
        error.response.status,
        error.response.message,
        error.response.statusText
      );
    }
  }

  _clearQuerys() {
    let test = Object.values(this._querys);
    console.log(test);
  }
}

module.exports = new HotelService();
