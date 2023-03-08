import Router from "./routes";
import { useState, useEffect } from "react";

import axiosInstance from "./axiosInstance";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Router />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
