import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);

  const curr_url = window.location.href;
  const root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  const params = useParams();
  const id = params.id;

  const dealer_url = root_url + `djangoapp/dealer/${id}`;
  const reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  const post_review_url = root_url + `postreview/${id}`;

  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url);
      const retobj = await res.json();
      console.log("Dealer fetch result:", retobj); // Debug log
      if (retobj.status === 200) {
        if (Array.isArray(retobj.dealer) && retobj.dealer.length > 0) {
          setDealer(retobj.dealer[0]);
        } else if (retobj.dealer) {
          setDealer(retobj.dealer); // single object
        } else {
          setDealer({ full_name: "Unknown Dealer" });
        }
      } else {
        setDealer({ full_name: "Unknown Dealer" });
      }
    } catch (err) {
      console.error("Failed to fetch dealer:", err);
      setDealer({ full_name: "Unknown Dealer" });
    }
  };

  const get_reviews = async () => {
    try {
      const res = await fetch(reviews_url);
      const retobj = await res.json();
      if (retobj.status === 200) {
        if (retobj.reviews && retobj.reviews.length > 0) {
          setReviews(retobj.reviews);
        } else {
          setUnreviewed(true);
        }
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setUnreviewed(true);
    }
  };

  const senti_icon = (sentiment) => {
    if (!sentiment) return neutral_icon;
    return sentiment === "positive"
      ? positive_icon
      : sentiment === "negative"
      ? negative_icon
      : neutral_icon;
  };

  useEffect(() => {
    get_dealer();
    get_reviews();

    // Temporary alert to pause page for screenshot
    alert("Dealer page loaded — pause here for screenshot");

    if (sessionStorage.getItem("username")) {
      setPostReview(
        <Link to={`/postreview/${id}`}>
          <img
            src={review_icon}
            style={{ width: "10%", marginLeft: "10px", marginTop: "10px" }}
            alt="Post Review"
          />
        </Link>
      );
    }
  }, [id]);

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ color: "grey" }}>
          {dealer.full_name}
          {postReview}
        </h1>
        <h4 style={{ color: "grey" }}>
          {dealer.city},{dealer.address}, Zip - {dealer.zip}, {dealer.state}
        </h4>
      </div>
      <div className="reviews_panel">
        {reviews.length === 0 && !unreviewed ? (
          <span>Loading Reviews....</span>
        ) : unreviewed ? (
          <div>No reviews yet!</div>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review_panel">
              <img
                src={senti_icon(review.sentiment)}
                className="emotion_icon"
                alt="Sentiment"
              />
              <div className="review">{review.review}</div>
              <div className="reviewer">
                {review.name} {review.car_make} {review.car_model}{" "}
                {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;
