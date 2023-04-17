import React, { useState, useRef, useEffect } from "react";
import * as GameParams from '../GameParams/GameParams.json'
import { GameFunc, DIRECTIONS, check_collision } from "../GameFunc/GameFunc";
import "../sass/Game.scss";

export default function Game() {
  const [update, setUpdate] = useState(false);
  const [scoreLbl, setScoreLbl] = useState(0);
  const runBtnRef = useRef();
  const interval = useRef();
  const canvasRef = useRef();
  const score = useRef(0);
  const state = useRef([0, 0, 0, 0, 0, 0]);
  const heading = useRef();
  const action = useRef();
  const qTable = useRef({});
  const snake = useRef([]);
  const food = useRef([]);

  const placeFood = () => {
    food.current = {};
    const x = Math.floor(
      (Math.random() * GameParams.canvasSquare) / GameParams.cellSize
    );
    const y = Math.floor(
      (Math.random() * GameParams.canvasSquare) / GameParams.cellSize
    );
    food.current = { x: x, y: y };
  };
  const initActors = () => {
    state.current = [0, 0, 0, 0, 0, 0];
    action.current = null;
    heading.current = DIRECTIONS.UP;
    snake.current = [];
    for (let i = 0; i < GameParams.SnakeInitLength; i++) {
      snake.current.push({
        x: GameParams.canvasSquare / GameParams.cellSize / 2 - i,
        y: GameParams.canvasSquare / GameParams.cellSize / 2,
      });
    }
    placeFood();
  };

  useEffect(() => {
    console.log("----> Initialize");
    initActors();
  }, []);
  const clearCanvas = () => {
    const context2D = canvasRef.current.getContext("2d");
    context2D.clearRect(0, 0, GameParams.canvasSquare, GameParams.canvasSquare);
  };
  const drawCanvas = () => {
    const context2D = canvasRef.current.getContext("2d");
    clearCanvas();
    //Fill Background
    context2D.fillStyle = GameParams.canvasBackgroundColor;
    context2D.fillRect(0, 0, GameParams.canvasWidth, GameParams.canvasHeight);
    context2D.fillStyle = "black";
    context2D.font = "1rem sans-serif";
    context2D.fillText(`Score: ${score.current}`, 0, 20);
    context2D.fillStyle = "green";
    context2D.strokeStyle = "black";
  };
  const drawActors = () => {
    const context2D = canvasRef.current.getContext("2d");

    //Snake
    snake.current.forEach((block) => {
      context2D.fillRect(
        block.x * GameParams.cellSize,
        block.y * GameParams.cellSize,
        GameParams.cellSize,
        GameParams.cellSize
      );
      context2D.strokeRect(
        block.x * GameParams.cellSize,
        block.y * GameParams.cellSize,
        GameParams.cellSize,
        GameParams.cellSize
      );
    });
    //Food
    context2D.fillStyle = "red";
    context2D.fillRect(
      food.current.x * GameParams.cellSize,
      food.current.y * GameParams.cellSize,
      GameParams.cellSize,
      GameParams.cellSize
    );
    context2D.strokeRect(
      food.current.x * GameParams.cellSize,
      food.current.y * GameParams.cellSize,
      GameParams.cellSize,
      GameParams.cellSize
    );
  };
  const move = () => {
    let moveX = snake.current[0].x;
    let moveY = snake.current[0].y;
    const boundarySize = GameParams.canvasSquare / GameParams.cellSize;
    if (heading.current === DIRECTIONS.RIGHT) {
      moveX++;
    } else if (heading.current === DIRECTIONS.LEFT) {
      moveX--;
    } else if (heading.current === DIRECTIONS.UP) {
      moveY--;
    } else if (heading.current === DIRECTIONS.DOWN) {
      moveY++;
    }
    //Snake - dead or alive
    if (
      moveX === -1 ||
      moveX === boundarySize ||
      moveY === -1 ||
      moveY === boundarySize ||
      check_collision(moveX, moveY, snake.current)
    ) {
      return "DEAD";
    }
    //Food or not
    let tail = {};
    if (moveX === food.current.x && moveY === food.current.y) {
      tail = { x: moveX, y: moveY };
      return "SCORE";
    } else {
      tail = snake.current.pop();
      tail.x = moveX;
      tail.y = moveY;
    }
    snake.current.unshift(tail);
    return "NORMAL";
  };
  const runGame = () => {
    //Draw the canvas
    drawCanvas();
    // Get the state
    state.current = GameFunc.getState(
      snake.current,
      heading.current,
      food.current
    );

    action.current = GameFunc.getAction(state.current, qTable.current);
    heading.current = GameFunc.implementAction(action.current, heading.current);
    const gameState = move();
    //console.log(heading);
    drawActors();
    //Compute Rewards and Punishments in order for future growth
    GameFunc.computeRewardPunishment(
      state.current,
      action.current,
      snake.current,
      heading.current,
      food.current,
      qTable.current
    );
    if (gameState === "DEAD") {
      initActors();
    } else if (gameState === "SCORE") {
      score.current++;
      setScoreLbl(score.current);
      initActors();
    }
  };
  useEffect(() => {
    const context2D = canvasRef.current.getContext("2d");
    //Fill Background
    context2D.fillStyle = GameParams.canvasBackgroundColor;
    context2D.fillRect(0, 0, GameParams.canvasWidth, GameParams.canvasHeight);
    context2D.fillStyle = "black";
    context2D.font = "1rem sans-serif";
    context2D.fillText(`Score: ${score.current}`, 0, 20);

    if (update === true) {
      interval.current = setInterval(runGame, GameParams.gameSpeed);

      return () => {
        console.log("Stop timer -- unmounted");
        clearInterval(interval);
      };
    }
  }, [update]);

  const runHandle = () => {
    console.log("Run");
    setUpdate(true);
    runBtnRef.current.disabled = true;
  };

  return (
    <div className="game">
      <h1>SlitherAI</h1>
      <h2>Terms</h2>
      <details>
        <summary>Learning Rate</summary>
        <p>
          This refers to the proportional amount of change during training.
          Usually between 0.01 and 1, where low values produce more stable and
          accurate results at the cost of ALOT MORE TRAINING samples or epochs.
        </p>
      </details>
      <details>
        <summary>Gamma factor</summary>
        <p>
          A number, usually between 0 and 1, that correlates to values for
          rewards and punishments
        </p>
      </details>
      <div className="gameBox">
        <canvas
          ref={canvasRef}
          width={GameParams.canvasSquare}
          height={GameParams.canvasSquare}
        ></canvas>
        <div className="displayParams">
          <label>Score: {scoreLbl}</label>
          <br />
          <label>Learning Rate: {GameParams.learningRate}</label>
          <br />
          <label>Gamma Factor: {GameParams.Gamma}</label>
          <br />
          <button ref={runBtnRef} onClick={runHandle}>
            Run
          </button>
        </div>
      </div>
    </div>
  );
}
