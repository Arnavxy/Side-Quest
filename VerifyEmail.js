import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      axios
        .get(`http://localhost:3001/verify-email?token=${token}`)
        .then((response) => {
          alert(response.data.message);
          navigate("/login");
        })
        .catch((error) => {
          alert("Email verification failed.");
          navigate("/");
        });
    }
  }, [navigate, searchParams]);

  return (
    <div>
      <h2>Verifying email...</h2>
    </div>
  );
}

export default VerifyEmail;
