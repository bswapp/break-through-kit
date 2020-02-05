import React, { Component } from "react";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <h1 className="about-header">
          <p>About Us</p>
        </h1>

        <img className="img" />

        <h3 className="why">Why We Do What We Do</h3>
        <br />
        <p className="about-text">
          Break Through Kits are designed for people with mental illness by
          those who suffer with it themselves.
        </p>
        <br />
        <p className="about-text">
          These kits were created because of anxiety and the impact it has had
          in our lives.
        </p>
        <br />
        <p className="about-text">
          Each kit is designed to help others to get through and overcome the
          dark times that come with mental illness.
        </p>
        <br />
        <p className="about-text">
          Break Through Kits are not intended to cure mental illness and do not
          replace medication or professional therapy.
        </p>
        <br />
        <p className="about-text">
          Our goal is to make sure that each kit is hand crafted and allows to
          aid the healing process.
        </p>
        <br />
        <footer className="about-footer">
          <p className="footer-text">Break Through Kits 2020</p>
          <br />
        </footer>
      </div>
    );
  }
}

export default About;
