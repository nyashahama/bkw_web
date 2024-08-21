import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Avatar from "react-avatar";

const ProfileCard = ({ user_id }) => {
  const [profile, setProfile] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/${user_id}`
        );
        setProfile(response.data);
      } catch (error) {
        toast.error("Error fetching profile data.");
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [user_id]);

  const handleReviewTextChange = (e) => setReviewText(e.target.value);

  const handleRatingClick = (value) => setRating(value);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (reviewText.trim() === "" || rating === 0) {
      toast.error("Please provide both a review and a rating.");
      return;
    }

    try {
      await axios.post(`http://localhost:4000/reviews`, {
        user_id,
        reviewText,
        rating,
      });
      toast.success("Review submitted successfully!");
      setReviewText("");
      setRating(0);
    } catch (error) {
      toast.error("Error submitting review.");
      console.error("Error submitting review:", error);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-card bg-gray-200 border rounded-lg shadow-inner p-6">
      <div className="profile-header flex border-b-2 p-4 border-gray-300 items-center">
        <Avatar
          name={profile.full_name}
          size="120"
          round={false}
          className="mr-4"
        />
        <div className="profile-info flex flex-col">
          <h2 className="text-xl text-gray-600 font-extrabold mb-2">
            <i className="fas fa-user mr-2"></i>
            {profile.full_name}
          </h2>
          <p className="text-gray-600 mb-1">
            <i className="fas fa-envelope mr-2"></i>
            {profile.email}
          </p>
          <p className="text-gray-600 mb-1">
            <i className="fas fa-phone mr-2"></i>
            {profile.contact_number}
          </p>
          <p className="text-gray-600 mb-1">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {profile.address}
          </p>
        </div>
      </div>

      <div className="reviews mt-6">
        <h3 className="text-lg font-extrabold text-gray-600 mb-2">Reviews</h3>
        <div className="review-list mb-4">
          {profile.reviews && profile.reviews.length > 0 ? (
            profile.reviews.map((review, index) => (
              <div key={index} className="review-item border-b pb-2 mb-2">
                <p className="text-gray-800 font-medium">{review.author}</p>
                <p className="text-gray-600">{review.text}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star fa-solid ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-reviews flex items-center mt-4">
              <i className="fas fa-star-half-alt text-gray-400 text-2xl mr-2"></i>
              <p className="text-gray-600">No reviews yet</p>
            </div>
          )}
        </div>

        <div className="review-form">
          <h3 className="text-lg  font-extrabold text-gray-600 mb-2">
            Write a Review
          </h3>
          <form onSubmit={handleSubmitReview}>
            <textarea
              className="w-full p-2 border bg-gray-100 shadow-inner rounded-md mb-2"
              rows="4"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={handleReviewTextChange}
            />
            <div className="flex items-center mb-4">
              <p className="mr-4 text-gray-600">Rating:</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star mr-2 fa-2xl cursor-pointer ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingClick(i + 1)}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
