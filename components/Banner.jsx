import React from "react";
import { useState } from "react";

export default function Banner() {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <div
      className={`banner ${
        showBanner === true && "banner-show"
      } d-flex  flex-center-between`}
    >
      <marquee behavior="scroll" className="w-100">
        Vercel Error of Not Resolving next/Head module resulted in Absence of
        Title from all pages in the application. Sorry For Inconvinience caused
      </marquee>
      <button
        className="btn btn-transparent text-white"
        onClick={() => setShowBanner(false)}
      >
        &#10005;
      </button>
    </div>
  );
}
