//Restaurants Data Access Object
import Restaurants from "../models/restaurant.model.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    let query = {};
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    console.log(query);

    Restaurants.find(query)
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page)
      .lean()
      .exec((err, restaurants) => {
        if (err) {
          console.log(err);
        } else {
          res.json(restaurants);
        }
      });
  }
}
