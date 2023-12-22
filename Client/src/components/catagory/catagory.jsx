import { useState } from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./catagory.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";




function Catagory() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Custom arrow components
  const NextArrow = (props) => {
    const { onClick, currentSlide, slideCount } = props;
    return (
      <>
        {currentSlide < slideCount -1  ? (
          <div className="custom-slick-next" onClick={onClick}>
            <div className="nextarrow">
              <ArrowForwardIosIcon />
            </div>
          </div>
        ) : null}
      </>
    );
  };

  const PrevArrow = (props) => {
    const { onClick, currentSlide } = props;
    return (
      <>
        {currentSlide > 0 ? (
          <div className="custom-slick-prev" onClick={onClick}>
            <div className="prevarrow">
              <ArrowBackIosNewIcon />
            </div>
          </div>
        ) : null}

      </>
    );
  };




  //---------------------------------------------------------------------------------------------------firstSliderSettings
  const firstSliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  
  };


  //----------------------------------------------------------------------------------secondSliderSettings
  const secondSliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <div className="Category-Modal">
      <Button onClick={handleOpen}>Category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* ---------------------------------------------------------------------------------------------modal-container */}
        <Box className="category-modal-container">
          <div className="category-modal-title">
            <div
              id="modal-modal-title"
              className="category-title"
            >
              <Typography variant="h5" component="h2" >
                <span> Category </span>
              </Typography>
            </div>
            <div className="button-close">
              <CloseIcon onClick={handleClose} />
            </div>
          </div>
          <Typography
            id="modal-modal-description"
            style={{
              marginTop: "16px",
              marginBottom: "16px",
              marginLeft: "30px",
              marginRight: "16px",
              padding: "10px",
            }}
            component={"div"}
            className="Slider"
          >

            {/* ---------------------------------------------------------------------------------------------image-slide-musicMode */}
            <Slider {...firstSliderSettings}>
              <Link style={{ backgroundColor: "purple" }}>
                <div className="card">
                  <div className="cards-image">
                    <img
                      src="../../../public/assets/icons/sunbathing (1).png"
                      className="image-slide"
                    />
                  </div>
                  <div className="cardtext">
                    <b>Chill</b>
                  </div>
                </div>
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <div className="card">
                  <div className="cards-image">
                    <img
                      src="../../../public/assets/icons/man-working-on-a-laptop-from-side-view.png"
                      className="image-slide"
                    />
                  </div>
                  <div className="cardtext">
                    <b>Work</b>
                  </div>
                </div>
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <div className="card">
                  <div className="cards-image">
                    <img
                      src="../../../public/assets/icons/sleep.png"
                      className="image-slide"
                    />
                  </div>
                  <div className="cardtext">
                    <b>Sleep</b>
                  </div>
                </div>
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <div className="card">
                  <div className="cards-image">
                    <img
                      src="../../../public/assets/icons/yoga.png"
                      className="image-slide"
                    />
                  </div>
                  <div className="cardtext">
                    <b>Relax</b>
                  </div>
                </div>
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <div className="card">
                  <div className="cards-image">
                    <img
                      src="../../../public/assets/icons/jazz.png"
                      className="image-slide"
                    />
                  </div>
                  <div className="cardtext">
                    <b>Jazz</b>
                  </div>
                </div>
              </Link>

            </Slider>
          </Typography>
          <div className="category-modal-title-second">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginLeft: "15px" }}
            >
              <span>
                Choose picture
              </span>
            </Typography>
          </div>

          {/* ---------------------------------------------------------------------------------------------image-slide-ImageMode */}

          <Typography
            id="modal-modal-description"
            style={{
              marginBottom: "16px",
              marginLeft: "30px",
              marginRight: "16px",
              padding: "10px",
            }}
            className="Slider Slider-second"
          >
            <Slider {...secondSliderSettings}>
              <Link style={{ backgroundColor: "purple" }}>
                <div className="card-image">
                    
                </div>
              </Link>

              <Link style={{ backgroundColor: "purple" }}>
                <div className="card-image">

                </div>
              </Link>

              <Link style={{ backgroundColor: "purple" }}>
                <div className="card-image">

                </div>
              </Link>
            </Slider>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Catagory;
