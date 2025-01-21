import React, { useState } from 'react';
import '../stylings/feedbackhub.css'; // Ensure the CSS is properly scoped as before

const FeedbackHub = () => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback || !category) {
      alert("Please fill out both fields.");
      return;
    }
    const newFeedback = {
      id: submittedFeedback.length + 1,
      feedback,
      category,
      status: 'Pending', // Default status is "Pending"
      date: new Date().toLocaleString(),
    };
    setSubmittedFeedback([...submittedFeedback, newFeedback]);
    setFeedback('');
    setCategory('');
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000); // Hide "Thank You" after 3 seconds
  };

  return (
    <div className="feedback-hub">
      <h1>Feedback Hub</h1>
      
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
          </div>

          <button type="submit" className="submit-btn">Submit Feedback</button>
        </form>
        
        {showThankYou && <p className="thank-you-message">Thank you for your feedback!</p>}
      </div>

      <div className="feedback-list">
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
      </div>
    </div>
  );
};

export default FeedbackHub;
