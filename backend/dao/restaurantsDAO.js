//Restaurants Data Access Object
import ReviewsController from "../api/reviewsController.js";
import Restaurants from "../models/restaurant.model.js";
import Review from "../models/reviews.model.js";

export default class RestaurantsDAO {
  static getRestaurants(req, res) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    }
    if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    }
    if (req.query.name) {
      filters.name = req.query.name;
    }

    let query = [{}, {}, {}];
    if (filters) {
      if ("name" in filters) {
        query[0] = { $text: { $search: filters["name"] } };
      }
      if ("cuisine" in filters) {
        query[1] = { cuisine: { $eq: filters["cuisine"] } };
      }
      if ("zipcode" in filters) {
        query[2] = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    Restaurants.find(query[0])
      .find(query[1])
      .find(query[2])
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page)
      .lean()
      .exec((err, restaurants) => {
        if (err) {
          console.log(err);
        } else {
          let count = 0;
          for (const restaurant of restaurants) {
            count++;
          }

          let response = {
            restaurants: restaurants,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: count,
          };

          res.json(response);
        }
      });
  }

  static getRestaurantByID(req, res) {
    let id = req.params.id || {};
    Restaurants.findById(id).exec((err, restaurant) => {
      if (err) {
        console.log(err);
      } else if (!restaurant) {
        res.status(404).json({ error: "Not found" });
      }

      const restaurantId = "" + restaurant._id;
      console.log(restaurantId);

      Review.find({ restaurantID: restaurantId }).exec((err, reviews) => {
        if (reviews) {
          //console.log("Reviews found");
          restaurant.reviews = reviews;
          res.json(restaurant);
        } else {
          //console.log("No Reviews Found");
          res.json(restaurant);
        }
      });
    });
  }

  static getCuisines(req, res) {
    Restaurants.find()
      .distinct("cuisine")
      .exec((err, cuisines) => {
        if (err) {
          console.log(err);
        } else if (!cuisines) {
          res.status(404).json({ error: "Not found" });
        }
        res.json(cuisines);
      });
  }

  // static addRestaurantReview(restaurantID, reviewDoc) {
  //   Restaurants.updateOne(
  //     { restaurant_id: restaurantID },
  //     { $push: { reviews: reviewDoc } }
  //   ).exec((err, res) => {
  //     //console.log(res);
  //   });
  // }

  // static updateRestaurantReview(restaurantID, reviewId, review, date) {
  //   Restaurants.findOneAndUpdate(
  //     { restaurant_id: restaurantID },
  //     { $push: { reviews: reviewDoc } }
  //   ).exec((err, res) => {
  //     console.log(res);
  //   });
  // }

  // static deleteRestaurantReview(restaurantID, reviewId) {
  //   Restaurants.findOneAndUpdate(
  //     { restaurant_id: restaurantID },
  //     { $push: { reviews: reviewDoc } }
  //   ).exec((err, res) => {
  //     console.log(res);
  //   });
  // }
}
