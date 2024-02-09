import { useState } from "react";
import { Button, Typography } from "@mui/material";
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
import { cate } from "../../data/musicMode";

function Catagory() {
  const [open, setOpen] = useState(false);
  const { setChangedImage, toggleMode } = useMode();

  const [isSliderSecondVisiblechang, setIsSliderSecondVisiblechang] =
    useState(true);
  const [data, setData] = useState([]);
  // const { video, nameType } = typeLofi.reduce((acc, type) => (type.video && type.video[0] && type.video[0].data && type.video[0].data.length > 0 ? { ...type.video[0].data[0] } : acc), {});

  // console.log(data)

  const handleButtonClickchang = () => {
    setIsSliderSecondVisiblechang(!isSliderSecondVisiblechang);
  };

  // set data for ahead to lofi mode or reality
  const handleData = (value1) => {
    setData(value1);
  };
  // insert data to ChangeImage in ModeContext
  const handleDataContext = (value) => {
    setChangedImage(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedMode, setSelectedMode] = useState("");

  const NextArrow = (props) => {
    const { onClick, currentSlide, slideCount } = props;
    return currentSlide < slideCount - 2 ? (
      <div className="custom-slick-next" onClick={onClick}>
        <div className="nextarrow">
          <ArrowForwardIosIcon />
        </div>
      </div>
    ) : null;
  };

  const PrevArrow = (props) => {
    const { onClick, currentSlide } = props;
    return currentSlide > 0 ? (
      <div className="custom-slick-prev" onClick={onClick}>
        <div className="prevarrow">
          <ArrowBackIosNewIcon />
        </div>
      </div>
    ) : null;
  };

  const handleButtonClick = (selectedMode) => {
    toggleMode(selectedMode);
    setSelectedMode(selectedMode);
  };

  // Setting music slider
  const firstSliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  // Setting image slider
  const secondSliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="Category-Modal">
      <button onClick={handleOpen} className="img-icon-category">
        <img src="/assets/icons/open-menu.png" alt="" />
      </button>

      {open && (
        <Draggable handle=".category-modal-title">
          <div className="category-modal-container">
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
            {/* ------------------------------------------ Mode Music -------------------------------------------------------------- */}
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
              className={`Slider ${
                isSliderSecondVisiblechang ? "" : "Slider-third"
              }`}
            >
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
            <div className="silde-grop">
              {/* ------------------------------------------- Mode Image ------------------------------------------------------------ */}
              <Typography
                id="modal-modal-description"
                style={{
                  marginBottom: "16px",
                  marginLeft: "30px",
                  marginRight: "16px",
                  padding: isSliderSecondVisiblechang
                    ? "10px"
                    : "0px 10px 0px 0px",
                }}
                className={`Slider ${
                  isSliderSecondVisiblechang ? "Slider-second" : "Slider-third"
                }`}
              >
                {isSliderSecondVisiblechang ? (
                  <Slider {...secondSliderSettings}>
                    {typeLofi.map((type, i) => (
                      <Button
                        key={i}
                        onClick={() => {
                          type.video &&
                            type.video[0] &&
                            type.video[0].data &&
                            type.video[0].data.length > 0 &&
                            handleData([type.video, type.nameType]);
                          handleButtonClickchang();
                        }}
                        disabled={
                          !type.video ||
                          !type.video[0] ||
                          !type.video[0].data ||
                          type.video[0].data.length === 0
                        }
                      >
                        <div className="card-image" style={{ color: "#000" }}>
                          {type.video &&
                          type.video[0] &&
                          type.video[0].data &&
                          type.video[0].data[0] ? (
                            <video src={type.video[0].data[0].src} />
                          ) : (
                            <video src="" />
                          )}
                          <span
                            style={{
                              color: "#fff",
                              fontFamily: "Roboto, sans-serif",
                              textShadow:"1px 1px 2px #fff",
                            }}
                          >
                            {type.nameType}
                          </span>
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
                ) : (
                  <>
                    <p
                      onClick={handleButtonClickchang}
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        color: "rgba(138, 43, 226, 1)",
                        borderRadius: "50px",
                        borderBottom: "1px solid rgba(61, 61, 61, 1)",
                      }}
                    >
                      <ChevronLeftIcon /> {data[1]}
                    </p>
                    <Slider {...secondSliderSettings}>
                      {data[0].map((datas, i) => (
                        <Button
                          key={i}
                          onClick={() => handleDataContext(datas)}
                        >
                          <div
                            className="card-image-third"
                            style={{ color: "#000" }}
                          >
                            {datas.data &&
                              datas.data[0] &&
                              datas.data[0].src && (
                                <video src={datas.data[0].src} />
                              )}
                          </div>
                        </Button>
                      ))}
                    </Slider>
                  </>
                )}
              </Typography>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Catagory;
