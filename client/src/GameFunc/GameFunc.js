import * as GameParams from "../GameParams/GameParams.json";

export const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export function getQ(state, action, qTable) {
  const newState = state;
  newState.push(action);
  if (newState in qTable) {
    return qTable[newState];
  } else {
    return 0;
  }
}
function writeToQTable(state, action, reward, qTable) {
  const consolidatedStateAction = state.slice();
  consolidatedStateAction.push(action);
  if (!(consolidatedStateAction in qTable)) {
    //Stores the state + action = reward
    qTable[consolidatedStateAction] = 0;
  }
  qTable[consolidatedStateAction] += reward;
}
function sortByKey(qArray, qKey) {
  return qArray.sort((a, b) => {
    const x = a[qKey];
    const y = b[qKey];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
function checkIfClear(x, y, snake) {
  //0 not available
  const size = GameParams.canvasSquare / GameParams.cellSize;
  if (
    x === -1 ||
    x === size ||
    y == -1 ||
    y === size ||
    check_collision(x, y, snake)
  ) {
    return 0;
  } else {
    return 1;
  }
}
export function check_collision(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x == x && array[i].y == y) return true;
  }
  return false;
}
function checkIfFood(x, y, heading, food) {
  const tmpFoodState = [];

  if (heading == DIRECTIONS.RIGHT) {
    if (food.y == y) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }

    if (food.y < y) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }

    if (food.y > y) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }
  }
  if (heading === DIRECTIONS.LEFT) {
    if (food.y == y) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }

    if (food.y > y) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }

    if (food.y < y) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }
  }
  if (heading === DIRECTIONS.UP) {
    if (food.x == x) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }

    if (food.x < x) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }
    if (food.x > x) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }
  }
  if (heading === DIRECTIONS.DOWN) {
    if (food.x == x) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }

    if (food.x > x) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }

    if (food.x < x) {
      tmpFoodState.push(1);
    } else {
      tmpFoodState.push(0);
    }
  }

  return tmpFoodState;
}

export const GameFunc = {
  getState: (snake, heading, food) => {
    let tmpState = [];
    const head = { x: snake[0].x, y: snake[0].y };
    if (heading === DIRECTIONS.UP) {
      tmpState.push(checkIfClear(head.x, head.y - 1, snake));
      tmpState.push(checkIfClear(head.x - 1, head.y, snake));
      tmpState.push(checkIfClear(head.x + 1, head.y, snake));

      tmpState = tmpState.concat(checkIfFood(head.x, head.y, heading, food));
    } else if (heading === DIRECTIONS.DOWN) {
      tmpState.push(checkIfClear(head.x, head.y + 1, snake));
      tmpState.push(checkIfClear(head.x + 1, head.y, snake));
      tmpState.push(checkIfClear(head.x - 1, head.y, snake));

      tmpState = tmpState.concat(checkIfFood(head.x, head.y, heading, food));
    } else if (heading === DIRECTIONS.LEFT) {
      tmpState.push(checkIfClear(head.x - 1, head.y, snake));
      tmpState.push(checkIfClear(head.x, head.y + 1, snake));
      tmpState.push(checkIfClear(head.x, head.y - 1, snake));

      tmpState = tmpState.concat(checkIfFood(head.x, head.y, heading, food));
    } else if (heading === DIRECTIONS.RIGHT) {
      tmpState.push(checkIfClear(head.x + 1, head.y, snake));
      tmpState.push(checkIfClear(head.x, head.y - 1, snake));
      tmpState.push(checkIfClear(head.x, head.y + 1, snake));

      tmpState = tmpState.concat(checkIfFood(head.x, head.y, heading, food));
    }
    return tmpState;
  },
  getAction: function (state, qTable) {
    let qEntry = [];
    const tmpQT = [];
    for (let i = 0; i < 3; i++) {
      qEntry.push({ a: i, q: getQ(state, i, qTable) });
    }
    qEntry = sortByKey(qEntry, "q");
    qEntry.reverse();

    tmpQT.push(qEntry[0]);
    if (qEntry[0]["q"] == qEntry[1]["q"]) {
      tmpQT.push(qEntry[1]);
    }
    if (qEntry[0]["q"] == qEntry[2]["q"]) {
      tmpQT.push(qEntry[2]);
    }

    return tmpQT[Math.floor(Math.random() * tmpQT.length)]["a"];
  },

  implementAction: function (action, heading) {
    if (heading === DIRECTIONS.UP) {
      if (action == 1) {
        heading = DIRECTIONS.LEFT;
      }
      if (action == 2) {
        heading = DIRECTIONS.RIGHT;
      }
    } else if (heading == DIRECTIONS.DOWN) {
      if (action == 1) {
        heading = DIRECTIONS.RIGHT;
      }
      if (action == 2) {
        heading = DIRECTIONS.LEFT;
      }
    } else if (heading == DIRECTIONS.RIGHT) {
      if (action == 1) {
        heading = DIRECTIONS.UP;
      }
      if (action == 2) {
        heading = DIRECTIONS.DOWN;
      }
    } else if (heading == DIRECTIONS.LEFT) {
      if (action == 1) {
        heading = DIRECTIONS.DOWN;
      }
      if (action == 2) {
        heading = DIRECTIONS.UP;
      }
    }
    return heading;
  },
  writeToQTable: (state, action, reward, qTable) => {
    const consolidatedStateAction = state.slice();
    consolidatedStateAction.push(action);
    if (!(consolidatedStateAction in qTable)) {
      //Stores the state + action = reward
      qTable[consolidatedStateAction] = 0;
    }
    qTable[consolidatedStateAction] += reward;
  },
  computeRewardPunishment: function (
    state,
    action,
    snake,
    heading,
    food,
    qTable
  ) {
    let currentStateReward = 0;
    //By calling getState, you are looking at the next state
    const futureState = this.getState(snake, heading, food);

    if (JSON.stringify(state) != JSON.stringify(futureState)) {
      if (
        (state[0] == 0 && action == 0) ||
        (state[1] == 0 && action == 1) ||
        (state[2] == 0 && action == 2)
      ) {
        //Punish
        currentStateReward = -GameParams.punDeath;
      }
      if (
        (state[0] == 1 && action == 0 && state[3] == 1) ||
        (state[1] == 1 && action == 1 && state[4] == 1) ||
        (state[2] == 1 && action == 2 && state[5] == 1)
      ) {
        //Reward
        currentStateReward = GameParams.rewardTowardsFood;
      }

      const optimalFutureValue = Math.max(
        getQ(futureState, 0, qTable),
        getQ(futureState, 1, qTable),
        getQ(futureState, 2, qTable)
      );
      const updateValue =
        GameParams.learningRate *
        (currentStateReward +
          GameParams.learningRate * optimalFutureValue -
          getQ(state, action, qTable));
      writeToQTable(state, action, updateValue, qTable);
    }
  },
};
