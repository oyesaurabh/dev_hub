import React from "react";

const Footer = () => {
  return (
    <div className="w-full text-center py-3 ">
      <p className=" text-sm opacity-75">
        © {new Date().getFullYear()} Devhub. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
