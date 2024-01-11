import { useState, createContext, useRef } from "react";
import { Button, Modal, Box, Typography, Backdrop } from "@mui/material";
import Slider from "react-slick";
import "./catagory.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useMode } from "../../context/modeContext";
import Draggable from "react-draggable";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { typeLofi } from "../../data/chooseVideo";

function CustomBackdrop(props) {
  return (
    <Backdrop {...props} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} />
  );
}

function Catagory() {
  const { mode, toggleMode } = useMode();
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const { setChangedImage } = useMode();

  const cate = [
    { id: 0, mode: "chill", src: "/assets/icons/sunbathing (1).png" },
    { id: 1, mode: "sexy", src: "/assets/icons/woman.png" },
    { id: 2, mode: "happy", src: "/assets/icons/jumping-man.png" },
    { id: 3, mode: "romantic", src: "/assets/icons/drinks.png" },
    { id: 4, mode: "sad", src: "/assets/icons/abused.png" },
  ];
  // ------------------------------------------------------------------------------clickchangslide

  const [isSliderSecondVisiblechang, setIsSliderSecondVisiblechang] =
    useState(true);

  const [data, setData] = useState([]);

  // console.log("data outside :", data);

  const handleButtonClickchang = () => {
    setIsSliderSecondVisiblechang(!isSliderSecondVisiblechang);
  };

  const handleData = (value1) => {
    setData(value1);
  };

  const handleDataContext = (value) => {
    setChangedImage(value);
    // console.log(value);
  };

  const handback = () => {
    if (isSliderSecondVisiblechang === "true") {
      setIsSliderSecondVisiblechang(false);
    }
  };

  // console.log(mode);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedMode, setSelectedMode] = useState("");
  // console.log("SelcetedMode" + selectedMode);

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
          slidesToShow: 2,
          slidesToScroll: 2,
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
          slidesToShow: 2,
          slidesToScroll: 2,
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

      {open && (
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
                {cate.map((cates) => (
                  <Button
                    onClick={() => handleButtonClick(cates.mode)}
                    key={cates.id}
                  >
                    <div
                      className="card"
                      style={{
                        border:
                          selectedMode === cates.mode
                            ? "2px solid #BB98FF"
                            : "none",
                        width: selectedMode === cates.mode ? "90px" : "",
                        height: selectedMode === cates.mode ? "96px" : "",
                      }}
                    >
                      <div className="cards-image">
                        <img
                          src={cates.src}
                          className="image-slide"
                          alt={cates.mode}
                        />
                      </div>
                      <div className="cardtext">
                        <b>{cates.mode}</b>
                      </div>
                    </div>
                  </Button>
                ))}
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

            <div className="silde-grop">
              {isSliderSecondVisiblechang ? (
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
                    {typeLofi.map((type, i) => (
                      <Button
                        onClick={() => {
                          if (
                            type.video &&
                            type.video[i] &&
                            type.video[i].data &&
                            type.video[i].data.length > 0
                          ) {
                            handleButtonClickchang();
                            handleData([type.video, type.nameType]);
                          }
                        }}
                        key={i}
                        disabled={
                          !type.video ||
                          !type.video[i] ||
                          !type.video[i].data ||
                          type.video[i].data.length === 0
                        }
                      >
                        <div className="card-image" style={{ color: "#000" }}>
                          {type.video &&
                          type.video[i] &&
                          type.video[i].data &&
                          type.video[i].data[0] ? (
                            <video src={type.video[i].data[0].src} />
                          ) : (
                            <video src="" />
                          )}
                          <span>{type.nameType}</span>
                          <div className="coti-img">
                            <AddPhotoAlternateIcon
                              fontSize="small"
                              marginBottom="10px"
                              style={{ margin: "4px" }}
                            />{" "}
                            <p>{type.video ? type.video.length : 0}</p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </Slider>
                </Typography>
              ) : (
                <Typography
                  id="modal-modal-description"
                  style={{
                    marginBottom: "16px",
                    marginLeft: "30px",
                    marginRight: "16px",
                    padding: "0px 10px 0px 0px",
                  }}
                  className="Slider Slider-third"
                >
                  <p
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      color: "rgba(138, 43, 226, 1)",
                      borderRadius: "50px",
                      borderBottom: "1px solid rgba(61, 61, 61, 1)",
                    }}
                    onClick={handleButtonClickchang}
                  >
                    <ChevronLeftIcon /> {data[1]}
                  </p>

                  <Slider {...secondSliderSettings}>
                    {data[0].map((datas, i) => (
                      <Button key={i} onClick={() => handleDataContext(datas)}>
                        <div
                          className="card-image-third"
                          style={{ color: "#000" }}
                        >
                          {datas.data && datas.data[0] && datas.data[0].src && (
                            <video src={datas.data[0].src} />
                          )}
                        </div>
                      </Button>
                    ))}
                  </Slider>
                </Typography>
              )}
            </div>
          </Box>
        </Draggable>
      )}
    </div>
  );
}

export default Catagory;
