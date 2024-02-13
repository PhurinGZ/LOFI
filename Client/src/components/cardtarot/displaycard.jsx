import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import CloseIcon from "@mui/icons-material/Close";

const TAROT_URL = "https://lofi-tarot.vercel.app"; //http://localhost:9000

function Displaycard({ showModaltarot, setShowModaltarot }) {
  const [datatarot, setDatatarot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPredictionContent, setShowPredictionContent] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [randomCards, setRandomCards] = useState([]);
  const [refreshRandomCard, setRefreshRandomCard] = useState(false);

  useEffect(() => {
    axios
      .get(`${TAROT_URL}/api/v1/cards`, {
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDatatarot(response.data);
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        setIsLoading(false);
      });
    getRandomCards();
  }, []);

  const getRandomCards = async () => {
    try {
      const response = await axios.get(
        `${TAROT_URL}/api/v1/cards/random?n=1`
      );
      setRandomCards(response.data.cards);
      console.log("RandomCards", response);
    } catch (error) {
      console.error("Error fetching random cards:", error);
    }
  };

  useEffect(() => {
    if (refreshRandomCard) {
      getRandomCards();
      setRefreshRandomCard(false);
    }
  }, [refreshRandomCard]);

  const handleOpenButtonClick = () => {
    setShowModaltarot(true);
    setSelectedCard(null);
  };

  const closeModal = () => {
    setShowModaltarot(false);
    setShowContent2(false);
    setSelectedCard(null);
    setRefreshRandomCard(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handlePredictionButtonClick = async () => {
    if (selectedCard !== null) {
      setIsLoading(true);
      try {
        setShowPredictionContent(true);
        setIsLoading(false);
        setShowPredictionContent(true);
        setShowModaltarot(false);
        setShowContent2(true);
      } catch (error) {
        console.error("Error during prediction:", error);
      }
    } else {
      alert("Selecte Card Please");
    }
  };

  return (
    <div>
      {/* Backdrop */}
      {showModaltarot && (
        <div className="backdrop" onClick={closeModal}></div>
      )}

      <div className={`main ${selectedCard ? "card-hovered" : ""}`}>
        <button onClick={handleOpenButtonClick}>เปิด</button>
        {showModaltarot && (
          <div className="back-caard">
            <div className="title">
              {showPredictionContent
                ? "ตั้งสมาธิและกดเลือกไพ่ 1 ใบค่ะ"
                : "ตั้งสมาธิและกดเลือกไพ่ 1 ใบค่ะ"}
            </div>
            <CloseIcon
              onClick={closeModal}
              style={{
                color: "#2c2828",
                cursor: "pointer",
                position: "absolute",
                right: "10px",
              }}
            />
            <div className="contentcard">
              {Array.from({ length: 30 }, (_, index) => (
                <div
                  className={`tarot-card ${
                    selectedCard === index ? "hovered" : ""
                  }`}
                  style={{ "--i": index - 15 }}
                  key={index}
                  onClick={() => handleCardClick(index)}
                >
                  <img src="assets/icons/tarotcard.jpg" alt="" />
                </div>
              ))}
            </div>
            <div className="contentcard">
              {Array.from({ length: 30 }, (_, index) => (
                <div
                  className={`tarot-card ${
                    selectedCard === index + 30 ? "hovered" : ""
                  }`}
                  style={{ "--i": index - 15, top: "70px", left: "43%" }}
                  key={index + 30}
                  onClick={() => handleCardClick(index + 30)}
                >
                  <img src="assets/icons/tarotcard.jpg" alt="" />
                </div>
              ))}
            </div>
            <div className="contentcard">
              {Array.from({ length: 18 }, (_, index) => (
                <div
                  className={`tarot-card ${
                    selectedCard === index + 60 ? "hovered" : ""
                  }`}
                  style={{ "--i": index - 15, top: "150px", left: "55%" }}
                  key={index + 60}
                  onClick={() => handleCardClick(index + 60)}
                >
                  <img src="assets/icons/tarotcard.jpg" alt="" />
                </div>
              ))}
            </div>
            {isLoading ? (
              <div
                style={{
                  fontSize: "5rem",
                  top: "50%",
                  zIndex: "5",
                  color: "#fff",
                  position: "absolute",
                }}
              >
                Loading...
              </div>
            ) : (
              <button
                className="bin-summit"
                onClick={handlePredictionButtonClick}
                // disabled = {selectedCard === null}
              >
                ทำนาย
              </button>
            )}
          </div>
        )}
        {showContent2 && (
          <div>
          <div className="backdrop" onClick={closeModal}></div>
          <div className="back-caard2">
            <div className="title">คำทำนายของวันนี้</div>
            <CloseIcon
              onClick={closeModal}
              style={{
                color: "#2c2828",
                cursor: "pointer",
                position: "absolute",
                right: "10px",
              }}
            />

            <div className="contentcard">
              {randomCards.map((card, index) => (
                <div className="tarot-card">
                  <img
                    src={`https://sacred-texts.com/tarot/pkt/img/${card.name_short}.jpg`}
                    alt=""
                  />
                </div>
              ))}
              <strong
                style={{
                  position: "absolute",
                  bottom: "30%",
                  left: "8%",
                  color: "#2c2828",
                  fontSize: "1.5rem",
                }}
              >
                {" "}
                {randomCards[0]?.name}
               <br />(  {randomCards[0].name_thai})
              </strong>
            </div>

            <span
              style={{
                fontSize: "1rem",
                position: "absolute",
                top: "30%",
                left: "30%",
                width: "60%",
                color: "#2c2828",
              }}
            >
              
              {randomCards[0]?.meaning_up}
            </span>
            <button
              className="bin-summit"
              onClick={() => {
                setShowModaltarot(true);
                setShowContent2(false);
                setSelectedCard(null);
                setRefreshRandomCard(true);
              }}
            >
              กลับไปก่อนหน้านี้
            </button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Displaycard;
