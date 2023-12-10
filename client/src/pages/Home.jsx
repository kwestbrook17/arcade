import React, { useState } from "react";
import GameList from "../components/GameList";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Carousel from "../components/Carousel";
import CustomPrevArrow from "../components/CustomPrevArrow";
import CustomNextArrow from "../components/CustomNextArrow";
import carouselPhoto1 from "../assets/counterStrikeBanner.png";
import carouselPhoto2 from "../assets/pokemonBanner.jpg";
import carouselPhoto3 from "../assets/gamegoBanner.png";

const Home = () => {
  const carouselPhotos = [carouselPhoto1, carouselPhoto2, carouselPhoto3];

  const productLinks = [
    "https://example.com/product1",
    "https://example.com/product2",
    "https://example.com/product3",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "Anton",
        }}
      >
        Featured Products
      </h1>
      <Carousel
        photos={carouselPhotos}
        productLinks={productLinks}
        settings={settings}
      />
      <CategoryMenu />
      <ProductList />
      <GameList />
    </div>
  );
};

export default Home;
