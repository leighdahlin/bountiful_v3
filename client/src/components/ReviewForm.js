export default function ReviewForm({ reviewFormSubmit, reviewContent, reviewChange }) {
    return (
        <form className="animate login-form" onSubmit={reviewFormSubmit}>
        <div className="container">
          <label htmlFor="title">
            <b>Title</b>
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            name="title"
            value={reviewContent.title}
            onChange={reviewChange}
            required
          />
          <label htmlFor="review-content">
            <b>Review</b>
          </label>
          <textarea
            id="body"
            type="text"
            placeholder="Enter Review"
            name="body"
            rows="5"
            cols="55"
            value={reviewContent.body}
            onChange={reviewChange}
            required
          ></textarea>
        <div className="rating-submit-div">
          <label htmlFor="rating">
            <b>Rating</b>
          </label>
          <div className="slidecontainer">
            <span className="zero">0</span>
            <input
              id="rating"
              type="range"
              min="1"
              max="5"
              value="50"
              className="slider"
              id="myRange"
              name="rating"
              value={reviewContent.rating}
              onChange={reviewChange}
            />
            <span className="five">5</span>
          </div>
        <div className="container btn-container">
          <button id="submit-review" type="submit" className=" btn submitbtn">
            Submit Review
          </button>
        </div>
        </div>
      </div>
      </form>
    )
}