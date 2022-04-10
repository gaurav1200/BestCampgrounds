import React from "react";
import { Link, Navigate } from "react-router-dom";
import "../App1.css";
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="footer" className="footer">
        <div>
          {/* <table width="90%" style={{ marginLeft: "16px" }}>
            <tbody>
              <tr>
                <td>
                  <tr>
                    <a href="/aboutus" classNameName="nav-link">
                      <h6 classNameName="nameColor">About Us</h6>
                    </a>
                  </tr>
                  <tr>
                    <a href="/contactus" classNameName="nav-link">
                      <h6 classNameName="nameColor">Contact Us</h6>
                    </a>
                  </tr>
                  <tr>
                    <a href="/termsnconditions" classNameName="nav-link">
                      <h6 classNameName="nameColor">Terms & Conditions</h6>
                    </a>
                  </tr>

                  <tr>
                    <a href="/privacypolicy" classNameName="nav-link">
                      <h6 classNameName="nameColor">Privacy Policy</h6>
                    </a>
                  </tr>

                  <tr>
                    <a href="/faqs" classNameName="nav-link">
                      <h6 classNameName="nameColor">FAQs</h6>
                    </a>
                  </tr>
                </td>
                <td classNameName="float-end">
                  <div classNameName="nameColor">
                    <h2>Contact Us</h2> WhatsApp us :
                    <span
                      style={{
                        display: "inline-block;",
                        marginBottom: "1rem;",
                      }}
                    >
                      <a>9999888800</a>
                    </span>
                    <br />
                    <br /> <h2>Download App</h2> <br />
                    <a style={{ marginRight: "16px" }}>
                      <img
                        src="https://www.jiomart.com/images/cms/wysiwyg/app-icons/play_store.png"
                        alt="Download GreenMart App for Android from Play Store"
                      />
                    </a>
                    <a>
                      <img
                        src="https://www.jiomart.com/images/cms/wysiwyg/app-icons/ios_store.png"
                        alt="Download GreenMart App for iOs from App Store"
                      />
                    </a>
                  </div>{" "}
                </td>
              </tr>
            </tbody>
          </table> */}
          <div className="copyright">
            <div className="pt-4">
              <div className="d-flex justify-content-center">
                <a href="/aboutus" className="nav-link">
                  <h6 className="nameColor">About Us</h6>
                </a>

                <a href="/contactus" className="nav-link">
                  <h6 className="nameColor">Contact Us</h6>
                </a>

                <a href="/termsnconditions" className="nav-link">
                  <h6 className="nameColor">Terms & Conditions</h6>
                </a>

                <a href="/privacypolicy" className="nav-link">
                  <h6 className="nameColor">Privacy Policy</h6>
                </a>

                <a href="/faqs" className="nav-link">
                  <h6 className="nameColor">FAQs</h6>
                </a>
              </div>
              <div className="mt-auto d-flex justify-content-center text-black-50">
                © Sep 2021 IACSD Pune Students, Best Campgrounds CDAC Project,
                INDIA
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
