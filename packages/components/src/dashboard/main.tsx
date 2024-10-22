"use client";
import React from "react";

const Dashboard = ({
  currentUser,
}: {
  currentUser: any;
}) => {

  return (
    <div>
      <p>Welcome back {currentUser.name}</p>
    </div>
  );
};

export default Dashboard;
