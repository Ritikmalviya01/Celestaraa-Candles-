import React from "react";
import { GoArrowRight } from "react-icons/go";
import greenLeaf from "../assets/footerImages/greenLeaf.png";
import redLeaf from "../assets/footerImages/redLeaf.png";
import centerGreenLeaf from "../assets/footerImages/centerGreenLeaf.png";

const Footer = () => {
  return (
    <div className="bg-[var(--footer-skin-color-bg)] w-full h-screen">
      <div className="bg-[var(--color-primary)] relative w-full h-screen flex flex-col justify-center items-center rounded-t-[50%]">
        <div className="absolute left-0">
          <img src={greenLeaf} alt="" />
        </div>
        <div className="absolute right-0">
          <img src={redLeaf} alt="" />
        </div>
        <div className="content w-1/3 flex flex-col items-center gap-6">
          <h1 className="text-7xl  text-center font-heading font-extrabold text-[var(--footer-skin-color-bg)] ">
            Craft workshop team building
          </h1>
          <p className="font-text text-amber-50 text-center text-sm">
            Ignite teamwork and creativity with CERA's craft workshops.
            Collaborate, create, and bond as you craft personalized rugs and
            ceramics. Take home mementos of shared moments and lasting teamwork.
            Unleash creativity together at CERA.
          </p>

          <button className=" bg-amber-100 flex items-center justify-center px-4 py-2 w-fit font-heading font-bold ">
            Join Our Community <GoArrowRight />{" "}
          </button>
        </div>

        <div className="absolute  w-full h-full flex justify-center   top-11/12">
          <div className="box w-11/12 relative bg-[var(--footer-skin-color-bg)] rounded-lg h-fit p-20 flex justify-between">
            <div className="left relative z-10 font-text w-1/2 flex flex-col gap-6">
              <h2 className=" font-extrabold text-5xl">Join our newsletter</h2>
              <p>We are always looking to expand the marketing and development team to accelerate our growth.</p>
              <div className="inputAndBtn flex gap-4">
                <input type="text" className="px-3 py-2 bg-white" />
                <button className="px-3 py-2 text-white bg-[var(--color-primary)]">Subscribe</button>
              </div>
            </div>
            <div className="right  relative z-10 flex flex-col gap-2 justify-center">

                 <h3 className="text-6xl  font-extrabold text-[var(--color-primary)]">CELESTRAA</h3>
                
            </div>
           
            <div className="centerGreenLea absolute top-0 z-0 left-0 w-full h-full flex justify-center ">
              <img src={centerGreenLeaf}  alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
