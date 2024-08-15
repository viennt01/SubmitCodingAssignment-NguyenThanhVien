import React, { useState, useEffect, useRef } from "react";
import { getRandomInt } from "../until";

function generateRandomCircles(
  numCircles,
  rectWidth,
  rectHeight,
  circleRadius
) {
  const circles = [];
  for (let i = 0; i < numCircles; i++) {
    const x = getRandomInt(circleRadius, rectWidth - circleRadius);
    const y = getRandomInt(circleRadius, rectHeight - circleRadius);
    circles.push({ x, y, isSelect: false, isFading: true });
  }
  return circles;
}

function BoxPlay({
  numCircles,
  startGame,
  handleStartAndEndGame,
  handleNoti,
  handleTimeUpdate,
}) {
  const [circles, setCircles] = useState([]);
  const [currentCircle, setCurrentCircle] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const [rectDimensions, setRectDimensions] = useState({
    width: 400,
    height: 300,
  });
  const circleRadius = 20;
  const containerRef = useRef(null);

  //Control: the height and width of the rectangle are always within the user's display.
  useEffect(() => {
    if (containerRef.current) {
      setRectDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setRectDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle events when user clicks on start button:
  // - Check if there is a circle or not, if there is then continue.
  // - Set all values ​​to default to avoid errors in case user is playing and clicks restart.
  // - Create array including new circles.
  // - Update time continuously to be able to calculate time.
  const startNewGame = () => {
    if (numCircles > 0) {
      setCurrentCircle(1);
      handleStartAndEndGame(true);
      handleNoti("LET'S PLAY");
      setCircles([]);
      const newCircles = generateRandomCircles(
        numCircles,
        rectDimensions.width,
        rectDimensions.height,
        circleRadius
      );
      setCircles(newCircles);

      const id = setInterval(() => {
        handleTimeUpdate((prevTime) => prevTime + 10);
      }, 10);
      setIntervalId(id);
    }
  };

  //Receive command to start game and clear interval.
  useEffect(() => {
    if (startGame) {
      startNewGame();
    }

    return () => clearInterval(intervalId);
  }, [startGame]);

  //Check when user completes game then notify.
  useEffect(() => {
    if (circles.length !== 0 && startGame) {
      if (circles.every((circle) => circle.isSelect && !circle.isFading)) {
        handleNoti("ALL CLEARED");
        handleStartAndEndGame(false);
        clearInterval(intervalId);
      }
    }
  }, [circles]);

  //Handle the event of clicking on the circles:
  //Check if the game has started, if not then you cannot click on the circle, if it has started then continue.
  //Check if the click order is correct and return and message accordingly.
  const handleCircleClick = (index) => {
    if (!startGame) {
      return;
    }
    if (index + 1 === currentCircle) {
      setCircles((prevCircles) => {
        const newCircles = [...prevCircles];
        newCircles[index].isSelect = true;
        return newCircles;
      });
      setTimeout(() => {
        setCircles((prevCircles) => {
          const newCircles = [...prevCircles];
          newCircles[index].isFading = false;
          return newCircles;
        });
      }, 1000);
      setCurrentCircle(currentCircle + 1);
    } else {
      handleNoti("GAME OVER");
      handleStartAndEndGame(false);
      clearInterval(intervalId);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "50%",
        backgroundColor: "#e0e0e0",
        border: "2px solid #000",
        margin: "20px auto",
        paddingTop: "20px",
      }}
    >
      {circles.map((circle, index) => (
        <div
          key={index}
          onClick={() => handleCircleClick(index)}
          style={{
            zIndex: circle?.isFading ? circles.length - index : -1,
            position: "absolute",
            width: `${circleRadius * 2}px`,
            height: `${circleRadius * 2}px`,
            borderRadius: "50%",
            border: `1px solid #000`,
            backgroundColor: circle?.isSelect ? "red" : "white",
            opacity: circle?.isSelect ? 0 : 1,
            left: `${circle.x - circleRadius}px`,
            top: `${circle.y - circleRadius}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "opacity 1s ease",
          }}
        >
          <span>{index + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default BoxPlay;
