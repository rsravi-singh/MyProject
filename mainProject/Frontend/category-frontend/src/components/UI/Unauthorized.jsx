import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>403</h1>
      <p>You are not authorized to view this page.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}
