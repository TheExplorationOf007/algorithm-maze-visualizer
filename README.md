# Algorithm Maze Visualizer

一个纯前端的迷宫游戏与路径搜索可视化项目。打开 `index.html` 就可以运行，适合部署到 GitHub Pages，也适合学生阅读和修改。

Live Demo:

```text
https://theexplorationof007.github.io/algorithm-maze-visualizer/
```

## Features

- 随机生成网格迷宫
- 起点、终点和玩家当前位置高亮显示
- 霓虹风格迷宫地图和迷宫勇者角色
- 支持方向键或 WASD 手动移动
- 支持 BFS、DFS、A* 三种路径搜索算法
- 动画展示访问节点、边界节点和最终路径
- 显示算法名称、访问节点数、路径长度和运行时间
- 可调节动画速度
- 响应式深色主题界面

## Screenshots

> 截图占位：部署或运行项目后，可在这里添加页面截图。

```text
docs/screenshot-home.png
docs/screenshot-algorithm-running.png
```

## How to Run

方式一：直接运行

1. 下载或克隆项目。
2. 在浏览器中打开 `index.html`。

玩法：

- 青色格子是起点。
- 红色格子是终点。
- 小角色是玩家。
- 深色能量墙不能通过。
- 使用方向键或 WASD 移动。
- 点击 BFS、DFS、A* 可以观察不同算法如何搜索路径。

方式二：GitHub Pages 部署

1. 将项目推送到 GitHub 仓库。
2. 打开仓库的 Settings。
3. 进入 Pages。
4. Source 选择主分支和根目录。
5. 保存后等待 GitHub Pages 生成访问地址。

## Algorithms

### BFS

BFS（Breadth-First Search，广度优先搜索）会一层一层向外扩展。对于没有权重的网格地图，BFS 通常可以找到最短路径。

### DFS

DFS（Depth-First Search，深度优先搜索）会沿着一个方向尽量走到底，再回退尝试其他方向。DFS 不保证找到最短路径，但实现简单，适合观察搜索过程。

### A*

A* 会结合已经走过的距离和到终点的估计距离。本项目使用曼哈顿距离作为启发函数，在网格中通常能比 BFS 更有目标地搜索。

## Project Structure

```text
algorithm-maze-visualizer/
├── index.html
├── style.css
├── script.js
├── README.md
└── LICENSE
```

## Future Improvements

- 支持鼠标绘制墙体
- 支持拖拽设置起点和终点
- 添加更多算法，例如 Dijkstra 和 Greedy Best-First Search
- 增加迷宫尺寸选择
- 添加移动步数统计和计时挑战模式

## License

MIT License
