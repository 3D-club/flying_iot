import React, { Component } from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="scrollMenu">
      <a>Home</a>
      <a>Real Time</a>
      <a>Database</a>
      <a>Issues</a>
      <a>Queries</a>
    </div>
  );
}

export default NavBar;
