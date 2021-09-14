import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CREATE_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS } from "../utils/queries";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function Review() {
  //extract username from params and save it to a variable
  const { username } = useParams();

  const [createReview] = useMutation(CREATE_REVIEW);
  const { data } = useQuery(QUERY_REVIEWS, {
    variables: { reviewee: username },
  });
  // console.log("REVIEW DATA");
  // console.log(username);
  // console.log(data);
  const reviews = data?.reviews || {};

  const [reviewContent, setContent] = useState({
    rating: 0,
    reviewee: "", //need a user ID
    title: "",
    body: "",
  });

  reviewContent.reviewee = username;

  const reviewChange = (event) => {
    const { name, value } = event.target;
    setContent({
      ...reviewContent,
      [name]: value,
    });
  };

  const reviewFormSubmit = async (event) => {
    event.preventDefault();

    const sumbitRating = parseFloat(reviewContent.rating);
    reviewContent.rating = sumbitRating;

    // console.log(reviewContent);

    try {
      const mutationResponse = await createReview({
        //* added this from mutations.js
        variables: {
          rating: reviewContent.rating,
          reviewee: reviewContent.reviewee, //need a user ID
          title: reviewContent.title,
          body: reviewContent.body,
          // reviewTitle: reviewContent.title,
          // body: reviewContent.review,
          // username: window.location.pathname.split("/")[2],
          // starRating: reviewContent.rating,
          // reviewee: reviewContent.reviewee,
        },
      });

      window.location.assign("/profile/" + username);
      setMakeReview(true)

    } catch (e) {
      console.log(e);
    }
  };

  const [makeReview, setMakeReview] = useState(true)
  const [showMakeReview, setShowMakeReview] = useState(true)
  const loggedInUser = localStorage.getItem('username');

  console.log("USERNAME: " + username)
  console.log("LOGGED IN USER: " + loggedInUser)
  console.log()


  const makeReviewForm = () => {
    console.log(loggedInUser)
    setMakeReview(false)
    
  }

  return (
    <div className="review-container">
      <div className="make-review-container">
        {username === loggedInUser? <div></div>: <button className="btn make-review" onClick={makeReviewForm}>Make a Review</button>}
      </div>
      {makeReview? <div></div>:<ReviewForm reviewFormSubmit={reviewFormSubmit} reviewContent={reviewContent} reviewChange={reviewChange} />}
      <ReviewCard reviewData={reviews} />
    </div>
  );
}
