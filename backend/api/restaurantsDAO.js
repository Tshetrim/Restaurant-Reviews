//Restaurants Data Access Object
import Restaurants from "../models/restaurant.model.js";

export default class RestaurantsDAO {
  static getRestaurants(restaurantsPerPage, page) {
    const restaurantList = [];
    const doc = await Restaurants.find({})
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page)
      .lean(true)
      .exec((err, restaurants) => {
        for (const res of restaurants) {
          restaurantList.push(res);
        }
      });
    console.log("Query: " + doc);
  }
}
