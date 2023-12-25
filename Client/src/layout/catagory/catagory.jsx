import { useState, createContext, useRef } from "react";
import { Button, Modal, Box, Typography, Backdrop } from "@mui/material";
import Slider from "react-slick";
import "./catagory.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useMode } from "./modeContext";
import Draggable from "react-draggable";

function CustomBackdrop(props) {
  return (
    <Backdrop {...props} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} />
  );
}

function Catagory() {
  const { mode, toggleMode } = useMode();
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // console.log(mode);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedMode, setSelectedMode] = useState("");
  // console.log(selectedMode)

  // Custom arrow components
  const NextArrow = (props) => {
    const { onClick, currentSlide, slideCount } = props;
    return (
      <>
        {currentSlide < slideCount - 2 ? (
          <div className="custom-slick-next" onClick={onClick}>
            <div className="nextarrow">
              <ArrowForwardIosIcon />
            </div>
          </div>
        ) : (
          <></>
        )}
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
        ) : (
          <></>
        )}
      </>
    );
  };

  // Custom arrow components 2
  const NextArrow2 = (props) => {
    const { onClick, currentSlide, slideCount } = props;
    return (
      <>
        {currentSlide < slideCount - 3 ? (
          <div className="custom-slick-next" onClick={onClick}>
            <div className="nextarrow">
              <ArrowForwardIosIcon />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const PrevArrow2 = (props) => {
    const { onClick, currentSlide } = props;
    return (
      <>
        {currentSlide > 0 ? (
          <div className="custom-slick-prev" onClick={onClick}>
            <div className="prevarrow">
              <ArrowBackIosNewIcon />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const handleButtonClick = (selectedMode) => {
    toggleMode(selectedMode);
    setSelectedMode(selectedMode);
  };

  //---------------------------------------------------------------------------------------------------firstSliderSettings
  const firstSliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <NextArrow2 />,
    prevArrow: <PrevArrow2 />,
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
      <button onClick={handleOpen} className="img-icon-category">
        <img src="/assets/icons/open-menu.png" alt="" />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={CustomBackdrop}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        background="none"
      >
        <div ref={modalRef}>
          <Draggable handle=".category-modal-title">
            {/* ---------------------------------------------------------------------------------------------modal-container */}
            <Box className="category-modal-container">
              <div className="category-modal-title">
                <div id="modal-modal-title" className="category-title">
                  <Typography variant="h5" component="h2">
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
                  <Button
                    onClick={() => handleButtonClick("chill")}
                  >
                    <div
                      className="card"
                      style={{
                        border: selectedMode === "chill" ? "2px solid #BB98FF" : "none",
                        width: selectedMode === "chill" ? "90px" : "",
                        height: selectedMode === "chill" ? "96px" : ""
                      }}
                    >
                      <div className="cards-image">
                        <img
                          src="/assets/icons/sunbathing (1).png"
                          className="image-slide"
                        />
                      </div>
                      <div className="cardtext">
                        <b>Chill</b>
                      </div>
                    </div>
                  </Button>
                  <Button onClick={() => handleButtonClick("sexy")}>
                    <div className="card" style={{
                        border: selectedMode === "sexy" ? "2px solid #BB98FF" : "none",
                        width: selectedMode === "sexy" ? "90px" : "",
                        height: selectedMode === "sexy" ? "96px" : ""
                      }}>
                      <div className="cards-image">
                        <img
                          src="/assets/icons/woman.png"
                          className="image-slide"
                        />
                      </div>
                      <div className="cardtext">
                        <b>Sexy</b>
                      </div>
                    </div>
                  </Button>
                  <Button onClick={() => handleButtonClick("happy")}>
                    <div className="card" style={{
                        border: selectedMode === "happy" ? "2px solid #BB98FF" : "none",
                        width: selectedMode === "happy" ? "90px" : "",
                        height: selectedMode === "happy" ? "96px" : ""
                      }}>
                      <div className="cards-image">
                        <img
                          src="/assets/icons/jumping-man.png"
                          className="image-slide"
                        />
                      </div>
                      <div className="cardtext">
                        <b>Happy</b>
                      </div>
                    </div>
                  </Button>
                  <Button onClick={() => handleButtonClick("romantic")}>
                    <div className="card" style={{
                        border: selectedMode === "romantic" ? "2px solid #BB98FF" : "none",
                        width: selectedMode === "romantic" ? "90px" : "",
                        height: selectedMode === "romantic" ? "96px" : ""
                      }}>
                      <div className="cards-image">
                        <img
                          src="/assets/icons/drinks.png"
                          className="image-slide"
                        />
                      </div>
                      <div className="cardtext" >
                        <b>Romantic</b>
                      </div>
                    </div>
                  </Button>
                  <Button onClick={() => handleButtonClick("sad")}>
                    <div className="card" style={{
                        border: selectedMode === "sad" ? "2px solid #BB98FF" : "none",
                        width: selectedMode === "sad" ? "90px" : "",
                        height: selectedMode === "sad" ? "96px" : ""
                      }}>
                      <div className="cards-image">
                        <img
                          src="/assets/icons/abused.png"
                          className="image-slide"
                        />
                      </div>
                      <div className="cardtext">
                        <b>Sad</b>
                      </div>
                    </div>
                  </Button>
                </Slider>
              </Typography>
              <div className="category-modal-title-second">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{ marginLeft: "15px" }}
                >
                  <span>Choose picture</span>
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
                  <Button>
                    <div className="card-image"></div>
                  </Button>

                  <Button>
                    <div className="card-image"></div>
                  </Button>

                  <Button>
                    <div className="card-image"></div>
                  </Button>
                </Slider>
              </Typography>
            </Box>
          </Draggable>
        </div>
      </Modal>
    </div>
  );
}

export default Catagory;
