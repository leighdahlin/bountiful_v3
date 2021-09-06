import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function Review() {
  const [reviewContent, setContent] = useState({
    rating: 5,
    reviewee: "", //need a user ID
  });

  const reviewChange = (event) => {
    const { name, value } = event.target;
    setContent({
      ...reviewContent,
      [name]: value,
    });
  };

  // const reviewFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await login({
  //       //TODO: what function or mutation should I call here?
  //       variables: {
  //         reviewTitle: reviewContent.title,
  //         reviewContent: reviewContent.review,
  //         starRating: reviewContent.rating,
  //         reviewee: reviewContent.reviewee,
  //       },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
      <div className="review-container">
        <form className="animate login-form">
          <div className="container">
            <label htmlFor="title">
              <b>Title</b>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              name="title"
              onChange={reviewChange}
              required
            />
            <label htmlFor="review-content">
              <b>Review</b>
            </label>
            <input
              id="review"
              type="text"
              placeholder="Enter Review"
              name="review"
              onChange={reviewChange}
              required
            />
          </div>
          <div className="container" style={{ background: "var(--gray)" }}>
            <button type="submit" className="submitbtn">
              Submit Review
            </button>
          </div>
        </form>
      </div>
  );
};

