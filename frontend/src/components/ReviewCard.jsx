import React from "react";
import { Link } from "react-router-dom";

function ReviewCard(props) {
  const { review, index, deleteReview, id, user } = props;
  console.log(user);
  return (
    <div className="col-lg-4 pb-1" key={index}>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            "{review.review}"
            <br />
            <strong>User: </strong>
            {review.userInfo.name}
            <br />
            <strong>Date: </strong>
            {review.date.substring(
              0,
              review.date.search(/[a-zA-Z]/) //regex to find first instance of a letter
            )}
          </p>

          {user && user.id === review.userInfo._id && (
            <div className="row">
              <button
                onClick={() => deleteReview(review._id, index)}
                className="btn btn-primary col-lg-5 mx-1 mb-1"
              >
                Delete
              </button>
              <Link
                to={{
                  pathname: "/restaurants/" + id + "/review",
                  state: {
                    currentReview: review,
                  },
                }}
                className="btn btn-primary col-lg-5 mx-1 mb-1"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
