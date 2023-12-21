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
    const { onClick } = props;
    return (
      <div className="custom-slick-next" onClick={onClick}>
        <ArrowForwardIosIcon />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-slick-prev" onClick={onClick}>
        <ArrowBackIosNewIcon />
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
        <Box className="category-modal-container">
          <div className="category-modal-title">
            <CloseIcon onClick={handleClose} className="button-close" />

            <div
              id="modal-modal-title"
              className="category-title"
              style={{ marginLeft: "15px", position: "relative", top: "-2rem" }}
            >
              <Typography variant="h6" component="h2" >
                Category
              </Typography>
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
            <Slider {...sliderSettings}>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slide"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slide"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slide"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slide"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slide"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slide"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slide"
                />
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
              Choose picture
            </Typography>
          </div>
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
            <Slider {...sliderSettings}>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slider-second"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slider-second"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slider-second"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slider-second"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slider-second"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slider-second"
                />
              </Link>
              <Link style={{ backgroundColor: "purple" }}>
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  className="image-slider-second"
                />
              </Link>
            </Slider>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Catagory;
