import React from "react";
import Marquee from 'react-fast-marquee';

const HowItWorks = () => {
  const images = [
    "/companies/google.png",
    "/companies/nvidia.png",
    "/companies/meta.png",
    "/companies/amazon.png",
    "/companies/adobe.png",
    "/companies/google.png",
    "/companies/nvidia.png",
    "/companies/meta.png",
    "/companies/amazon.png",
    "/companies/adobe.png",
    "/companies/google.png",
    "/companies/nvidia.png",
    "/companies/meta.png",
    "/companies/amazon.png",
    "/companies/adobe.png",
  ];

  return (
    <section className="howItWorks">
    <div className="text-center flex items-center flex-col ">
    <h3 className="text-xl font-bold text-center mb-4 overflow-hidden">
        1000+ Companies Hiring⚡
     </h3>
     <div className=" w-full flex justify-center items-center bg-[#e2b9f9]">
      <Marquee speed={52}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Marquee image ${index + 1}`}
            style={{
              width: "80px",
              height: "80px",
              marginRight: "20px",
              objectFit: "contain"
            }}
          />
        ))}
      </Marquee>
      </div>
    </div>
    </section>
  );
};

export default HowItWorks;
