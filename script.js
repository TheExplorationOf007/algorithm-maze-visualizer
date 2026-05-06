const ROWS = 21;
const COLS = 31;
const WALL = 1;
const EMPTY = 0;

const mazeEl = document.getElementById("maze");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const bfsBtn = document.getElementById("bfsBtn");
const dfsBtn = document.getElementById("dfsBtn");
const astarBtn = document.getElementById("astarBtn");
const speedRange = document.getElementById("speedRange");
const speedLabel = document.getElementById("speedLabel");
const statAlgorithm = document.getElementById("statAlgorithm");
const statVisited = document.getElementById("statVisited");
const statPath = document.getElementById("statPath");
const statTime = document.getElementById("statTime");
const statusText = document.getElementById("statusText");

let grid = [];
let cells = [];
let player = { row: 1, col: 1 };
let playerFacing = "down";
const start = { row: 1, col: 1 };
const end = { row: ROWS - 2, col: COLS - 2 };
let isAnimating = false;

function keyOf(cell) {
  return `${cell.row},${cell.col}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createGrid() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(WALL));
}

function carveMaze(row, col) {
  grid[row][col] = EMPTY;
  const directions = shuffle([
    { row: -2, col: 0 },
    { row: 2, col: 0 },
    { row: 0, col: -2 },
    { row: 0, col: 2 }
  ]);

  // Recursive backtracking: jump two cells, then open the wall between them.
  for (const direction of directions) {
    const nextRow = row + direction.row;
    const nextCol = col + direction.col;

    if (
      nextRow > 0 &&
      nextRow < ROWS - 1 &&
      nextCol > 0 &&
      nextCol < COLS - 1 &&
      grid[nextRow][nextCol] === WALL
    ) {
      grid[row + direction.row / 2][col + direction.col / 2] = EMPTY;
      carveMaze(nextRow, nextCol);
    }
  }
}

function renderGrid() {
  mazeEl.innerHTML = "";
  cells = [];
  mazeEl.style.gridTemplateColumns = `repeat(${COLS}, var(--cell-size))`;
  mazeEl.style.gridTemplateRows = `repeat(${ROWS}, var(--cell-size))`;

  for (let row = 0; row < ROWS; row += 1) {
    cells[row] = [];
    for (let col = 0; col < COLS; col += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.setAttribute("role", "gridcell");
      mazeEl.appendChild(cell);
      cells[row][col] = cell;
    }
  }

  paintGrid();
}

function paintGrid() {
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const cell = cells[row][col];
      cell.className = "cell";

      if (grid[row][col] === WALL) cell.classList.add("wall");
      if (row === start.row && col === start.col) cell.classList.add("start");
      if (row === end.row && col === end.col) cell.classList.add("end");
      if (row === player.row && col === player.col) {
        cell.classList.add("player", `player-${playerFacing}`);
      }
    }
  }
}

function clearPath() {
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      cells[row][col].classList.remove("visited", "frontier", "path");
    }
  }
  paintGrid();
}

function generateMaze() {
  createGrid();
  carveMaze(start.row, start.col);
  grid[start.row][start.col] = EMPTY;
  grid[end.row][end.col] = EMPTY;
  player = { ...start };
  playerFacing = "down";
  renderGrid();
  resetStats();
  statusText.textContent = "迷宫已生成。你可以手动移动，也可以运行算法。";
}

function resetStats() {
  statAlgorithm.textContent = "-";
  statVisited.textContent = "0";
  statPath.textContent = "0";
  statTime.textContent = "0 ms";
}

function neighbors(cell) {
  const moves = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
  ];

  return moves
    .map((move) => ({ row: cell.row + move.row, col: cell.col + move.col }))
    .filter((next) =>
      next.row >= 0 &&
      next.row < ROWS &&
      next.col >= 0 &&
      next.col < COLS &&
      grid[next.row][next.col] !== WALL
    );
}

function reconstructPath(cameFrom) {
  const path = [];
  let current = keyOf(end);

  while (cameFrom.has(current)) {
    const [row, col] = current.split(",").map(Number);
    path.unshift({ row, col });
    current = cameFrom.get(current);
  }

  return path;
}

function findPath(algorithm) {
  const visited = new Set();
  const cameFrom = new Map();
  const visitOrder = [];
  const frontierOrder = [];
  const startKey = keyOf(start);
  const endKey = keyOf(end);

  if (algorithm === "BFS") {
    const queue = [{ ...start }];
    visited.add(startKey);

    while (queue.length) {
      const current = queue.shift();
      visitOrder.push(current);
      if (keyOf(current) === endKey) break;

      for (const next of neighbors(current)) {
        const nextKey = keyOf(next);
        if (!visited.has(nextKey)) {
          visited.add(nextKey);
          cameFrom.set(nextKey, keyOf(current));
          queue.push(next);
          frontierOrder.push(next);
        }
      }
    }
  }

  if (algorithm === "DFS") {
    const stack = [{ ...start }];
    visited.add(startKey);

    while (stack.length) {
      const current = stack.pop();
      visitOrder.push(current);
      if (keyOf(current) === endKey) break;

      for (const next of shuffle(neighbors(current))) {
        const nextKey = keyOf(next);
        if (!visited.has(nextKey)) {
          visited.add(nextKey);
          cameFrom.set(nextKey, keyOf(current));
          stack.push(next);
          frontierOrder.push(next);
        }
      }
    }
  }

  if (algorithm === "A*") {
    const open = [{ ...start, g: 0, f: heuristic(start, end) }];
    const bestCost = new Map([[startKey, 0]]);

    while (open.length) {
      open.sort((a, b) => a.f - b.f);
      const current = open.shift();
      const currentKey = keyOf(current);
      if (visited.has(currentKey)) continue;
      visited.add(currentKey);
      visitOrder.push(current);
      if (currentKey === endKey) break;

      for (const next of neighbors(current)) {
        const nextKey = keyOf(next);
        const newCost = current.g + 1;

        // A* keeps the cheapest known cost and combines it with a Manhattan estimate.
        if (!bestCost.has(nextKey) || newCost < bestCost.get(nextKey)) {
          bestCost.set(nextKey, newCost);
          cameFrom.set(nextKey, currentKey);
          open.push({
            ...next,
            g: newCost,
            f: newCost + heuristic(next, end)
          });
          frontierOrder.push(next);
        }
      }
    }
  }

  return {
    visitOrder,
    frontierOrder,
    path: cameFrom.has(endKey) ? reconstructPath(cameFrom) : []
  };
}

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

async function runAlgorithm(algorithm) {
  if (isAnimating) return;
  isAnimating = true;
  setControlsDisabled(true);
  clearPath();

  const started = performance.now();
  const result = findPath(algorithm);
  const elapsed = performance.now() - started;
  const delay = Number(speedRange.value);

  statAlgorithm.textContent = algorithm;
  statusText.textContent = `${algorithm} 正在搜索...`;

  const frontierSet = new Set(result.frontierOrder.map(keyOf));
  for (const cell of result.visitOrder) {
    if (!isSpecialCell(cell)) {
      cells[cell.row][cell.col].classList.add("visited");
    }
    for (const next of neighbors(cell)) {
      const nextKey = keyOf(next);
      if (frontierSet.has(nextKey) && !isSpecialCell(next)) {
        cells[next.row][next.col].classList.add("frontier");
      }
    }
    await sleep(delay);
  }

  for (const cell of result.path) {
    if (!isSpecialCell(cell)) {
      cells[cell.row][cell.col].classList.remove("visited", "frontier");
      cells[cell.row][cell.col].classList.add("path");
    }
    await sleep(Math.max(10, delay / 1.5));
  }

  statVisited.textContent = String(result.visitOrder.length);
  statPath.textContent = String(result.path.length);
  statTime.textContent = `${elapsed.toFixed(2)} ms`;
  statusText.textContent = result.path.length
    ? `${algorithm} 找到了一条路径。`
    : `${algorithm} 没有找到路径。`;

  isAnimating = false;
  setControlsDisabled(false);
}

function isSpecialCell(cell) {
  return (
    (cell.row === start.row && cell.col === start.col) ||
    (cell.row === end.row && cell.col === end.col) ||
    (cell.row === player.row && cell.col === player.col)
  );
}

function setControlsDisabled(disabled) {
  [generateBtn, clearBtn, bfsBtn, dfsBtn, astarBtn].forEach((button) => {
    button.disabled = disabled;
  });
}

function movePlayer(rowDelta, colDelta) {
  if (isAnimating) return;
  const next = {
    row: player.row + rowDelta,
    col: player.col + colDelta
  };

  if (
    next.row < 0 ||
    next.row >= ROWS ||
    next.col < 0 ||
    next.col >= COLS ||
    grid[next.row][next.col] === WALL
  ) {
    return;
  }

  player = next;
  if (rowDelta < 0) playerFacing = "up";
  if (rowDelta > 0) playerFacing = "down";
  if (colDelta < 0) playerFacing = "left";
  if (colDelta > 0) playerFacing = "right";
  paintGrid();

  if (player.row === end.row && player.col === end.col) {
    statusText.textContent = "你到达了终点。可以重新生成迷宫继续挑战。";
  }
}

document.addEventListener("keydown", (event) => {
  const keyMap = {
    ArrowUp: [-1, 0],
    w: [-1, 0],
    W: [-1, 0],
    ArrowDown: [1, 0],
    s: [1, 0],
    S: [1, 0],
    ArrowLeft: [0, -1],
    a: [0, -1],
    A: [0, -1],
    ArrowRight: [0, 1],
    d: [0, 1],
    D: [0, 1]
  };

  if (keyMap[event.key]) {
    event.preventDefault();
    movePlayer(...keyMap[event.key]);
  }
});

generateBtn.addEventListener("click", generateMaze);
clearBtn.addEventListener("click", () => {
  if (isAnimating) return;
  clearPath();
  resetStats();
  statusText.textContent = "路径标记已清除。";
});
bfsBtn.addEventListener("click", () => runAlgorithm("BFS"));
dfsBtn.addEventListener("click", () => runAlgorithm("DFS"));
astarBtn.addEventListener("click", () => runAlgorithm("A*"));
speedRange.addEventListener("input", () => {
  speedLabel.textContent = `${speedRange.value} ms`;
});

generateMaze();
