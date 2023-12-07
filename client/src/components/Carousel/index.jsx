import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const Carousel = ({ photos, productLinks, settings }) => {
  const { prevArrow, nextArrow, ...otherSettings } = settings;

  return (
    <div className="carousel-container">
      <Slider {...otherSettings} prevArrow={prevArrow} nextArrow={nextArrow}>
        {photos.map((photo, index) => (
          <div key={index}>
            <a
              href={productLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={photo}
                style={{ maxHeight: "400px", width: "100%", height: "100%" }}
                alt={`Slide ${index + 1}`}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
