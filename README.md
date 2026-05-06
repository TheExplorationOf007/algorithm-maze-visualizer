# Algorithm Maze Visualizer

一个带有赛博风格视觉效果的迷宫游戏与路径搜索可视化项目。玩家可以手动穿越迷宫，也可以一键运行 BFS、DFS 和 A*，观察不同算法如何一步步探索地图并找到通往终点的路径。

[Live Demo](https://theexplorationof007.github.io/algorithm-maze-visualizer/)

## 项目亮点

- 纯 HTML、CSS、JavaScript 实现，无框架、无后端、无 API Key。
- 支持直接打开 `index.html` 运行，也适合部署到 GitHub Pages。
- 随机生成迷宫，每次挑战都有新的路线。
- 支持键盘方向键和 WASD 控制玩家移动。
- 内置 BFS、DFS、A* 三种经典路径搜索算法。
- 动画展示搜索过程，包括访问节点、边界节点和最终路径。
- 实时显示算法名称、访问节点数、路径长度和运行时间。
- 自定义角色头像与地图背景，配合深色霓虹 UI，视觉效果更完整。
- 代码结构简单清晰，适合学生学习前端交互、网格建模和算法可视化。

## 玩法

目标很简单：从青色起点出发，避开深色能量墙，到达红色终点。

- 使用方向键或 WASD 移动玩家。
- 点击 `生成迷宫` 可以刷新一张新地图。
- 点击 `清除路径` 可以移除上一次算法运行的痕迹。
- 点击 `运行 BFS`、`运行 DFS`、`运行 A*` 可以观察算法自动寻找路径。
- 拖动速度滑块可以调整动画播放速度。

## 算法说明

### BFS

BFS，也就是广度优先搜索，会从起点开始一层一层向外扩展。在没有权重的网格地图中，BFS 通常可以找到最短路径。

### DFS

DFS，也就是深度优先搜索，会沿着一个方向尽量走到底，走不通再回退。它不保证最短路径，但搜索过程很直观，适合观察递进和回溯的思想。

### A*

A* 会同时考虑已经走过的距离和离终点的估计距离。本项目使用曼哈顿距离作为启发函数，因此搜索会更有目标感，通常比 BFS 更快接近终点。

## 截图

<img width="2556" height="1346" alt="image" src="https://github.com/user-attachments/assets/302c4415-8450-42b8-8449-883d7fdabbe2" />


后续可以继续补充算法运行中的截图：

```text
docs/screenshot-pathfinding.png
```

## 本地运行

这个项目不需要安装依赖。

1. 下载或克隆仓库。
2. 双击打开 `index.html`。
3. 在浏览器中开始游戏。

## GitHub Pages 部署

1. 打开仓库的 `Settings`。
2. 进入 `Pages`。
3. Source 选择 `Deploy from a branch`。
4. Branch 选择 `main`，目录选择 `/root`。
5. 保存后等待 GitHub Pages 生成链接。

项目部署地址：

```text
https://theexplorationof007.github.io/algorithm-maze-visualizer/
```

## 项目结构

```text
algorithm-maze-visualizer/
├── assets/
│   ├── avatar-hd.png
│   └── background-hd.jpg
├── index.html
├── style.css
├── script.js
├── README.md
└── LICENSE
```

## 适合学习的知识点

- DOM 操作与事件监听
- CSS Grid 网格布局
- 键盘交互
- 随机迷宫生成
- BFS、DFS、A* 路径搜索
- 搜索过程动画
- GitHub Pages 静态站点部署

## 未来可以改进

- 支持鼠标绘制墙体
- 支持拖拽设置起点和终点
- 增加 Dijkstra 和 Greedy Best-First Search
- 增加地图尺寸选择
- 增加移动步数统计和计时挑战模式
- 添加移动端触控按钮

## License

MIT License
