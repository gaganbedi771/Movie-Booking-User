import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      {/* about */}
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-6">
            <h3 className="fw-bold">BookMySeat</h3>
            <p className="text-light-emphasis">
              BookMySeat is your one-stop destination for discovering the latest
              movies, checking show timings, and booking your favorite seats
              with ease. Enjoy a seamless movie booking experience anytime,
              anywhere.
            </p>
          </div>

          <div className="col-md-6 d-flex justify-content-end ">
            <div>
              <h5>Contact Us</h5>
              <p className="mb-1">📍 Delhi, India</p>
              <p className="mb-1">📧 support@bookmyseat.com</p>
              <p className="text-light">📞 +91 9999999999</p>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>
      <div className="text-center pb-2">
        © 2026 BookMySeat. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
