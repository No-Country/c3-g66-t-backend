const Success = require("../helpers/SuccessResponse");
const ErrorResponse = require("../helpers/ErrorResponse");

const axios = require("axios").default;

let options = {
    headers: {
        "x-rapidapi-host": process.env.API_HOST,
        "x-rapidapi-key": process.env.API_KEY,
    },
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v1/hotels/nearby",
    params: {
        latitude: "-22.911",
        longitude: "-43.2094",
        currency: "ARS",
        checkin_date: "2022-03-26",
        checkout_date: "2022-03-27",
        sort_order: "STAR_RATING_HIGHEST_FIRST",
        adults_number: "1",
        locale: "es_ES",
        page_number: "1",
    },
};

const controller = {
    list: async (req, res, next) => {
        //req.body.checkin_date = formatdate '2022-03-26'
        //req.body.checkout_date = formatdate '2022-03-26'

        try {
            const resObject = await axios.request(options);
            /*
                options.params = {
                    checkin_date: req.body.checkin_date,
                    checkout_date: req.body.checkout_date,
                    adults_number: req.body.adults_number,
                });
            */
            //console.log(resObject.data.searchResults)
            const resData = resObject.data.searchResults.results.map(element => {
                return {
                    id: element.id,
                    name: element.name,
                    starRating: element.starRating,
                    address: element.address,
                    guestReviews: element.guestReviews,
                    ratePlan: element.ratePlan,
                    neighbourhood: element.neighbourhood,
                    coordinate: element.coordinate,
                    thumbnailUrl: element.optimizedThumbUrls,
                };
            });
            res.status(200).json(new Success(200, "Hotels Finded", resData));
        } catch (error) {
            console.log(error);
            next(new ErrorResponse(error.code, error.message, error.data));
        }
    },
};

module.exports = controller;
