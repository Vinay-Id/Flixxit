import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Carousel = () => {
  const data = [
    {
      id: 603692,
      src: "/assets/caro1.webp",
      alt: "Image 1",
      title: "John Wick: Chapter 4",
    },
    {
      id: 667538,
      src: "/assets/caro2.webp",
      alt: "Image 2",
      title: "Transformers: Rise of the Beasts",
    },
    {
      id: 502356,
      src: "/assets/caro3.webp",
      alt: "Image 3",
      title: "The Super Mario Bros. Movie",
    },
    {
      id: 594767,
      src: "/assets/caro4.webp",
      alt: "Image 4",
      title: "Shazam! Fury of the Gods",
    },
    { id: 385687, src: "/assets/caro5.webp", alt: "Image 5", title: "Fast X" },

    {
      id: 569094,
      src: "/assets/caro6.webp",
      alt: "Image 6",
      title: "Spider-Man: Across the Spider-Verse",
    },
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
              <span className="detail-span">{item.title}</span>

              <br />
              <br />
              <button
                className="btn"
                onClick={
                  userInfo.membership === "Plus"
                    ? () => navigate("/videos")
                    : () =>
                        toast.info("Only accessible for Flixxit Plus Members")
                }
              >
                Watch Now
              </button>
              <button
                className="btn btn2"
                onClick={() => navigate(`/movie/${item.id}`)}
              >
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
