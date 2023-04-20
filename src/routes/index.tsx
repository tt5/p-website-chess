import { createSignal, For } from "solid-js";
import Square from "~/components/Square";

export default function Home() {

  //https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces

  const bpawn = [
  ["m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", 
  "opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"]
  ]

  const brook = [
  ["M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z", 
  "stroke-linecap:butt;"],
  ["M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z", 
  "stroke-linecap:butt;"],
  ["M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z",
  "stroke-linecap:butt;"],
  ["M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z",
  "stroke-linecap:butt;stroke-linejoin:miter;"],
  ["M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z",
  "stroke-linecap:butt;"],
  ["M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z",
  "stroke-linecap:butt;"],
  ["M 12,35.5 L 33,35.5 L 33,35.5",
  "fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"],
  ["M 13,31.5 L 32,31.5","fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"],
  ["M 14,29.5 L 31,29.5","fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"],
  ["M 14,16.5 L 31,16.5","fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"],
  ["M 11,14 L 34,14","fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"],
  ]

  const bknight = [
  ["M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",
  "fill:#000000; stroke:#000000;"],
  ["M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10",
  "fill:#000000; stroke:#000000;"],
  ["M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",
  "fill:#ffffff; stroke:#ffffff;"
  ],
  ["M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",
  "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"],
  ["M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z",
  "fill:#ffffff; stroke:none;"],
  ]

  const bbishop = [""]
  const bqueen = [""]
  const bking = [""]

  const wpawn = [""]
  const wrook = [""]
  const wknight = [""]
  const wbishop = [""]
  const wqueen = [""]
  const wking = [""]



  const [last, setLast] = createSignal(64)
  const [cursorPos, setCursorPos] = createSignal({x: 0, y:0})
  const [cursor, setCursor] = createSignal(["", ""])
  const [squareSize, setSquareSize] = createSignal(16)
  const [startPos, setStartPos] = createSignal([
    ["r"],["n"],["b"],["q"],["k"],["b"],["n"],["r"],
    ["p"],["p"],["p"],["p"],["p"],["p"],["p"],["p"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["P"],["P"],["P"],["P"],["P"],["P"],["P"],["P"],
    ["R"],["N"],["B"],["Q"],["K"],["B"],["N"],["R"],
  ])
  const [currentPos, setCurrentPos] = ([
    ["r"],["n"],["b"],["q"],["k"],["b"],["n"],["r"],
    ["p"],["p"],["p"],["p"],["p"],["p"],["p"],["p"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["e"],["e"],["e"],["e"],["e"],["e"],["e"],["e"],
    ["P"],["P"],["P"],["P"],["P"],["P"],["P"],["P"],
    ["R"],["N"],["B"],["Q"],["K"],["B"],["N"],["R"],
  ])

  const [legal, setLegal] = createSignal(Array.from({length: 64}, (_, i) => [i]))

  const changeLegal = (index, moves) => {
    var temp = legal()
    temp[index] = [index, ...moves]
    setLegal(temp)
  }

  (() => changeLegal(9, [0,1,2,8,9,10,16,17,18]))();
  (() => changeLegal(0, [0,9]))();

  const changeSquareSize = (size) => {
    setSquareSize(size)
  }

  const changeCursor = (cursor) => {
    console.log("cursor")
    setCursor(cursor)
  }

  const changeLast = (a) => {
    setLast(a)
  }

  function handleMouseMove(e: any) {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    })
  };

  //const startingPos = [].concat(... new Array(64).fill(["", bpawn, bnight, brook]))
  const  [pos, setPos] = createSignal([
    "", "", "", "", "", "", "", "",
    "", bpawn, "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", bpawn, "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
  ])

  const changePos = (index, piece) => {
    var temp = pos()
    temp[index] = piece
    setPos(temp)
    console.log("pos", pos())
  }

  const white="white"
  const black="gray-400"
  const oddrank = [].concat(... new Array(4).fill([white, black]))
  const evenrank = [].concat(... new Array(4).fill([black, white]))

  return (
  <div class="border" 
        onMouseMove={handleMouseMove} 
        onMouseUp={() => {changeLast("out"); changeCursor(["", ""])}}
  >
    <div class="resizeBoard p-2 border border-red-300 w-64">
      <div class="board border border-black w-auto aspect-square"
        //onMouseLeave={() => {changeLast("out"); changeCursor(["", ""])}}
      >
        <div class="flex flex-col">
        <For each={Array.from({length: 8}, (_, i) => i)} >
        {(i) => <div>
          <div class="flex max-w-16">
            <For each={Array.from({length: 8}, (_, i) => i)} fallback="">
              {(j) => <div class="">
                  <Square color={
                  (i % 2) ? 
                    (j % 2) ? white : black
                   : 
                    (j % 2) ? black : white
                  } 
                  name={i*8+j}
                  size={changeSquareSize} 
                  piece={pos()[i*8+j]}
                  pos={pos()}
                  changePos={changePos}
                  legal={legal()}
                  changeLegal={changeLegal}
                  last={last()}
                  changeLast={changeLast}
                  cursor={cursor()}
                  changeCursor={changeCursor}/>
                </div>
              }
            </For>
          </div>
        </div>
        }
        </For>
        </div>
        <svg class="cursor" style={{top: `${cursorPos().y - squareSize()/2}px`, "left": `${cursorPos().x - squareSize()/2}px`}} xmlns="http://www.w3.org/2000/svg" version="1.1" width={squareSize()} height={squareSize()} viewBox="0 0 45 45">
          <g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
            <For each={cursor()} fallback="">
              {(i) => <path d={i[0]} style={i[1]}/>}
            </For>
          </g>
        </svg>
      </div>
    </div>
  </div>
  );
}
