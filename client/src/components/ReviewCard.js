import formatTime from "../utils/helpers.js";
import "../assets/css/reviewCard.css";

export default function ReviewCard({ reviewData }) {
  if (!reviewData[0]) {
    return <div>Be the first to review!</div>;
  }

  if (reviewData[0]) {
    return reviewData.map((review) => (
      <div
        id="item-card"
        key={review._id}
        className="mb-3 item-card review-card"
        style={{ maxWidth: "500px" }}
      >
        <div className="row g-0">
          {/* <div className="col-md-4 card-pic">
                        <div className="item-buttons">
                        </div>
                        <img src={logo} className="img-fluid rounded-start items-b-logo" alt={item.item_name}/>
                    </div> */}
          <div
            id="card-id"
            className="col-md-8 card-id rev-card-body"
            data-id={review._id}
          >
            <div className="card-title">
              <h2 className="item-title">
                <strong>{review.title}</strong>{" "}
              </h2>
            </div>
            <div className="card-body">
              <p className="card-text" id="rev-username">
                {review.user.username}
              </p>
              <p className="card-text">Rating: {review.rating}</p>
              <p className="card-text">{review.body}</p>
              <p className="card-text">
                <small className="text-muted">
                  Date created: {formatTime(review.createdAt)}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}
