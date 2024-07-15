import React from 'react'
import Topbar from '../Topbar'
import CateImage4 from "../images/uibgLand3.gif";
import "./contactUs.css"

const ContactUs = () => {
  return (
    <>
      <Topbar />
      <div className="cnt">
        <div className="cnt1">
            <h1>Contact Us</h1>
            <p>
              Welcome to UI Master! We are dedicated to helping designers and
              developers create exceptional user interfaces through a
              collaborative and interactive platform. At UI Master, we believe
              in the power of community feedback to drive design excellence. Our
              platform allows users to upload their UI designs, share them with
              a global audience, and receive valuable ratings and reviews. By
              integrating advanced sentiment analysis technology, we provide
              insightful feedback that helps designers continuously improve
              their work. Our mission is to foster a supportive community where
              creativity thrives and innovation flourishes. Join us on this
              journey to revolutionize UI design evaluation and enhancement!
            </p>
        </div>

        <div className="cnt2">
          <img src={CateImage4} />
        </div>
      </div>
    </>
  )
}

export default ContactUs
