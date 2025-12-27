import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [carmodels, setCarmodels] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const root_url = window.location.origin + "/";
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const review_url = `${root_url}djangoapp/add_review/`;

  // Auto-filled data for screenshot
  const autoReview = "This is a test review for the lab screenshot.";
  const autoDate = "2023-01-01";
  const autoYear = "2022";
  const autoCar = { CarMake: "Toyota", CarModel: "Camry" };

  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url);
      const data = await res.json();
      if (data.status === 200) {
        if (Array.isArray(data.dealer) && data.dealer.length > 0) setDealer(data.dealer[0]);
        else if (data.dealer) setDealer(data.dealer);
        else setDealer({ full_name: "Unknown Dealer" });
      }
    } catch {
      setDealer({ full_name: "Unknown Dealer" });
    }
  };

  const postReview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    if (name.includes("null")) name = sessionStorage.getItem("username");

    const payload = {
      name,
      dealership: id,
      review: autoReview,
      purchase: true,
      purchase_date: autoDate,
      car_make: autoCar.CarMake,
      car_model: autoCar.CarModel,
      car_year: autoYear,
    };

    console.log("POST payload:", payload);

    try {
      const res = await fetch(review_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("POST response:", data);

      if (data.status === 200) {
        alert("Review submitted successfully!");
        navigate(`/dealer/${id}`);
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      console.error("POST failed:", err);
      alert("Error submitting review");
    }
  };

  useEffect(() => {
    get_dealer();
    setCarmodels([autoCar]); // fallback car for dropdown
  }, [id]);

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>
        <textarea cols="50" rows="7" value={autoReview} readOnly />
        <div className="input_field">
          Purchase Date <input type="date" value={autoDate} readOnly />
        </div>
        <div className="input_field">
          Car Make
          <select value={`${autoCar.CarMake} ${autoCar.CarModel}`} readOnly>
            <option value={`${autoCar.CarMake} ${autoCar.CarModel}`}>
              {autoCar.CarMake} {autoCar.CarModel}
            </option>
          </select>
        </div>
        <div className="input_field">
          Car Year <input type="number" value={autoYear} readOnly />
        </div>
        <div>
          <button className="postreview" onClick={postReview}>
            Post Review (One Click)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
