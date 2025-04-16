import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/HeaderAdvisor";
import { supabase } from "../auth/client"; // Make sure your Supabase client is properly imported
import '../stylings/feedbackhub.css';
import Footer from '../components/Footer';

const FeedbackHub = () => {
  let navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [email, setEmail] = useState(''); // State to store manually entered email

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  // Fetch feedback records tied to the current user
  useEffect(() => {
    /* const fetchUserFeedback = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("User not found or not logged in", error);
        return;
      }

      // Fetch feedback from the database for the logged-in user's email
      const { data, error: fetchError } = await supabase
        .from('feedback')
        .select('*')
        .eq('email', user.email); // Get feedback tied to the user's email

      if (fetchError) {
        console.error('Error fetching feedback:', fetchError);
      } else {
        setSubmittedFeedback(data); // Update state with feedback data
      }
    };

    fetchUserFeedback(); */
  }, []); // Empty dependency array means this runs once on component mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback || !category) {
      alert("Please fill out both fields.");
      return;
    }

    // Get the currently logged-in user
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.error("Error getting user or user is not logged in:", error);
      alert("You must be logged in to submit feedback.");
      return;
    }

    // Insert feedback into the feedback table
    const { data, error: insertError } = await supabase
      .from('feedback')
      .insert([
        {
          category,
          feedback,
          status: 'Pending', // Default status
          email: email, // Use the logged-in user's email
        }
      ]);

    if (insertError) {
      console.error('Error submitting feedback:', insertError);
    } else {
      // Ensure data is an array and has at least one item
      if (data && Array.isArray(data) && data.length > 0) {
        setSubmittedFeedback((prevFeedback) => [data[0], ...prevFeedback]);
      } else {
        console.error('No feedback data returned:', data);
      }

      // Reset form fields
      setFeedback('');
      setCategory('');
      setEmail('');
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000); // Hide "Thank You" after 3 seconds
    }
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <div className='content-wrapper'>
      <h1 className='font-bold text-2xl mb-2 mt-4'>Feedback Hub</h1>
        <div className="feedback-hub">

          <div className="form-container">
            <h2>Submit Your Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="Bug Report"
                      checked={category === 'Bug Report'}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    Bug Report
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Feature Request"
                      checked={category === 'Feature Request'}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    Feature Request
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="User Experience"
                      checked={category === 'User Experience'}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    User Experience
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="feedback">Your Feedback:</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Describe your feedback..."
                  required
                />
                <label htmlFor="email">Your Email Address:</label>
                <textarea
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">Submit Feedback</button>
            </form>

            {showThankYou && <p className="thank-you-message">Thank you for your feedback!</p>}
          </div>

          {/* <div className="feedback-list">
          <h2>Previous Feedback</h2>
          {submittedFeedback.length > 0 ? (
            <ul>
              {submittedFeedback.map((item) => (
                <li key={item.id} className="feedback-item">
                  <div className="feedback-header">
                    <span className="category">{item.category}</span>
                    <span className="status">{item.status}</span>
                  </div>
                  <p>{item.feedback}</p>
                  <small>Submitted on: {item.date}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No feedback submitted yet.</p>
          )}
        </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackHub;
