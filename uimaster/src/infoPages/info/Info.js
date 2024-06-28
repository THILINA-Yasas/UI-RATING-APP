import React from "react";
import "./info.css";
import InfoCard from "../infoCard/InfoCard";
import KKK from "../../images/DARK GRAY.gif";
import Res from "../../images/responsive1.gif";
import Res2 from "../../images/res2.gif";
import SmallImg from "../../images/clarity and simply city.gif";
import SmallImg2 from "../../images/simplicity.gif";
import Consist from "../../images/consistency.gif";
import Consisttwo from "../../images/HomeConsistance.png";
import Consistth from "../../images/Consist.png";
import Access1 from "../../images/AccessibilityONE.png";
import Access2 from "../../images/AccessibilityTWO.png";
import Access3 from "../../images/AccessibilityTHREE.png";
import Typo1 from "../../images/TypoOne.png";
import Typo2 from "../../images/TypoTwo.png";
import Typo3 from "../../images/TypoThree.png";
import Topbar from "../../Topbar";
import Stbg from "../../images/Standard bg.png";
import SSS from "../../images/Standard blackbg.png";

function Info() {
  const cardList = [
    {
      imgurl: KKK,
      categry: "Consistency",
      text: "Consistency in user interface design is crucial for creating a seamless and intuitive user experience. By maintaining uniformity in design elements such as colors, fonts, icons, and layouts throughout the interface, users can quickly learn how to navigate and interact with the system. Consistency fosters familiarity, reduces cognitive load, and enhances usability. When elements behave predictably and look consistent across different screens and interactions, users can focus on completing tasks without being distracted or confused by inconsistencies. \n Consistency in user interface design is crucial for creating a seamless and intuitive user experience. By maintaining uniformity in design elements such as colors, fonts, icons, and layouts throughout the interface, users can quickly learn how to navigate and interact with the system. Consistency fosters familiarity, reduces cognitive load, and enhances usability. \n When elements behave predictably and look consistent across different screens and interactions, users can focus on completing tasks without being distracted or confused by inconsistencies. \n \n",
      imgList: [Consist, Consisttwo, Consistth],
      urls: [],
    },

    {
      imgurl: KKK,
      categry: "Clarity and Simplicity",
      text: "The principle of clarity and simplicity revolves around making the user interface easy to understand and use. A cluttered or overly complex interface can overwhelm users and hinder their ability to accomplish tasks efficiently. By keeping the interface simple and straightforward, users can quickly grasp the purpose of each element and how to interact with them. Clear and concise language for labels, instructions, and error messages further enhances usability by eliminating ambiguity and guiding users through their interactions with the system. The principle of clarity and simplicity revolves around making the user interface easy to understand and use. \n \n A cluttered or overly complex interface can overwhelm users and hinder their ability to accomplish tasks efficiently. \n By keeping the interface simple and straightforward, users can quickly grasp the purpose of each element and how to interact with them. \n Clear and concise language for labels, instructions, and error messages further enhances usability by eliminating ambiguity and guiding users through their interactions with the system.",
      imgList: [SmallImg, SmallImg2],
      urls: [],
    },

    {
      imgurl: KKK,
      categry: "Responsive Design",
      text: "In today's multi-device world, responsive design has become essential for ensuring that interfaces look and function well across various screen sizes and devices. By designing interfaces with a mobile-first approach, designers can prioritize the needs of users on smaller screens while still providing a seamless experience on larger devices. Responsive design not only improves accessibility but also future-proofs interfaces against the ever-changing landscape of devices and technologies. In today's multi-device world, responsive design has become essential for ensuring that interfaces look and function well across various screen sizes and devices. By designing interfaces with a mobile-first approach, designers can prioritize the needs of users on smaller screens while still providing a seamless experience on larger devices. Responsive design not only improves accessibility but also future-proofs interfaces against the ever-changing landscape of devices and technologies.",
      imgList: [Res, Res2],
      urls: [],
    },

    {
      imgurl: KKK,
      categry: "Accessibility",
      text: "Accessibility is the ease of users’ ability to use products and services and meet their goals. In shorter terms, accessibility is the metric for how fully your users can use your app or website. \n While awareness can tend to focus on building apps and designs that are usable by people with disabilities, accessibility really applies to all users.\n Good accessibility is created by building an app that maximizes the number of users having a great experience, not just focusing on a subset of users having difficulties.\n When UX/UI designers approach building apps and designing experiences from this angle, they build designs that work for everyone. This idea of creating for universal understanding and use is called Universal Design.\n  \n",
      imgList: [Access1, Access2, Access3],
      urls: [
        "https://www.thinkful.com/blog/what-is-accessibility-in-ux-ui-design/",
      ],
    },

    {
      imgurl: KKK,
      categry: "Typography",
      text: "Typography is not only about picking the best fonts and their placement, it is the overall visual language used to communicate with users.  \n \n Typography can effectively convey a product in such a manner one wants it to be perceived, just like any other visual components like color, form, and pattern can. In this article, we’ll look into different elements of typography and how to seamlessly integrate them with designs.Typography is the art of utilizing typefaces and fonts to create content on a website/app that is clear, readable, understandable, and pleasurable to the user who is viewing it. Clear content prevents any confusion for users in navigation and taking action. In fact, a good choice of fonts helps in enhancing the overall aesthetics of the products. In typography, we study in detail fonts, their structure, appearance, and style that evoke emotions.",
      imgList: [Typo1, Typo2, Typo3],
      urls: ["https://www.geeksforgeeks.org/what-is-typography-in-ui-design/"],
    },
  ];

  return (
    <>
      <Topbar />
      <div className="info">
        <div className="infoscon">
          <h1 className="info0">UI Standards</h1>
          <hr color="#d66a1c" />
          <div className="info01">
            <div className="info2">
              {cardList.map((card, index) => {
                return <InfoCard key={index} props={card} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
