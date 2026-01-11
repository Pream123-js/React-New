import "./Forgotpassword.css";

import { Link } from "react-router-dom";
import { useState } from "react";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setSubmitted(true);
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        <h2>Forgot Password</h2>

        {!submitted ? (
          <>
            <p className="fp-text">
              Enter your registered email or username.  
              If this were a real system, a reset link would be sent.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit">Send Reset Link</button>
            </form>
          </>
        ) : (
          <p className="success-msg">
            If the account exists, a password reset link has been sent.
          </p>
        )}

        <div className="back-link">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
