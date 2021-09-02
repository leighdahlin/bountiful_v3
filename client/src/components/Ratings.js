import React from "react";

//import "need path for ratings css styling here";
//use font awesome for the fa stars

export default function Rating({ value, text, color }) {
  return (
    <>
      <div className="rating">
        {/*a span for each of the five stars*/}
        <span>
          <i
            className={
              value >= 1
                ? "fas fa-star"
                : value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 2
                ? "fas fa-star"
                : value >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 3
                ? "fas fa-star"
                : value >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 4
                ? "fas fa-star"
                : value >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color: color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 5
                ? "fas fa-star"
                : value >= 4.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color }}
          ></i>
        </span>
        <span className="ml-2">{text}</span>
      </div>
    </>
  );
}

Rating.defaultProps = {
  color: "#FFC100",
};