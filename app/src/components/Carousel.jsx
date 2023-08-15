import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Carousel = () => {
  const data = [
    { id: 1, src: "/assets/caro1.webp", alt: "Image 1" },
    { id: 2, src: "/assets/caro2.webp", alt: "Image 2" },
    { id: 3, src: "/assets/caro3.webp", alt: "Image 3" },
    { id: 4, src: "/assets/caro4.webp", alt: "Image 4" },
    { id: 5, src: "/assets/caro5.webp", alt: "Image 5" },
    { id: 6, src: "/assets/caro6.webp", alt: "Image 6" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesContainerRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const slideWidth = 100;

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    );
  }, [data.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === data.length - 1 ? 0 : prevSlide + 1
    );
  }, [data.length]);

  useEffect(() => {
    slidesContainerRef.current.style.transform = `translateX(-${
      currentSlide * slideWidth
    }%)`;
  }, [currentSlide, slideWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <div className="carousel">
      <div className="slides-container" ref={slidesContainerRef}>
        {data.map((item) => (
          <div key={item.id} className="slide">
            <img src={item.src} alt={item.alt} />
            <div className="play-button">
              <span className="detail-span">
                Unlimited movies,
                <br />
                shows and more
              </span>
              <br />
              <br />
              <button
                className="btn"
                onClick={
                  userInfo.membership === "Plus"
                    ? () => navigate("/videos")
                    : () => toast.info("Only accessible for Flixxit Plus users")
                }
              >
                Watch Now
              </button>
              <button className="btn btn2" onClick={()=>navigate("/profile")}>
                Get Detail
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next-button" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
