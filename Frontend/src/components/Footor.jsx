import React from 'react';
import logo from '../assets/assets_frontend/logo.svg';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_2fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* LEFT SIDE */}
        <div>
          <img className="mb-5 w-40" src={logo} alt="Company Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
            illo incidunt reiciendis deleniti aliquam, ab ducimus nihil ea,
            accusantium voluptatibus totam asperiores fugiat nisi cumque
            dolorum! Molestias harum soluta similique.
          </p>
        </div>
        {/* CENTER SIDE */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* RIGHT SIDE */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>
              <a href="mailto:sowmiyam.it2022@citchennai.net" className="hover:underline">
                sowmiyam.it2022@citchennai.net
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* COPYRIGHT SECTION */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ Sowmiya - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
