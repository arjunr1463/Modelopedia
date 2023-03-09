import React from "react";
import Header from "../Featured/LatestModel";
import Slider from "react-slick";
import Card from "../Card/LatestModelCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slick.css";

function Demolatest({ data, loading }) {
  const model = data
    .sort(() => Math.random() - 0.5)
    .filter((user) =>
      user.images.some((image) => image.imagestatus === "Approved")
    );

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "1rem",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "1rem",
        }}
        onClick={onClick}
      />
    );
  }
  const arrow = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //
  return (
    <div>
      <Header />

      <div className="bg-[#f8f9fa] flex justify-center pb-[80px]">
        {loading ? (
          <div className="text-[red] font-fair">Loading please wait...</div>
        ) : (
          <Slider
            {...settings}
            {...arrow}
            className=" w-[80vw] sm:w-[67vw] md:w-[87vw] lg:w-[67vw]"
          >
            {model.map((model) => {
              const approvedImages = model.images.filter(
                (image) => image.imagestatus === "Approved"
              );
              const approvedImage =
                approvedImages.length > 0
                  ? approvedImages[
                      Math.floor(Math.random() * approvedImages.length)
                    ]
                  : null;
              return (
                <>
                  <Card
                    key={model._id}
                    image={approvedImage ? approvedImage.image : null}
                    name={model.fullName}
                    place={model.city}
                    id={model._id}
                  />
                </>
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}
export default Demolatest;
