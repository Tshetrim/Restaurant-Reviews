import http from "../http-common";

class RestaurantDataService {
  //make all functions that make api calls and return the data to axios instance
  getAll(page = 0) {
    return http.get("?page=" + page);
  }

  get(id) {
    return http.get("/id/" + id);
  }

  find(query, by = "name", page = 0) {
    return http.get("?" + by + "=" + query + "&page=" + page);
  }

  createReview(data) {
    return http.post("/review", data);
  }

  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id, userId) {
    return http.delete("/review-delete?id=" + id, {
      data: { user_id: userId },
    });
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();

//navigation pages
