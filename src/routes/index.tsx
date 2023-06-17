import { createSignal, For } from "solid-js";
import Square from "~/components/Square";
import {
  bpawn, brook, bknight, bbishop, bqueen, bking,
  wpawn, wrook, wknight, wbishop, wqueen, wking
} from "../data/pieces"; 

export default function Home() {

  const [last, setLast] = createSignal(64)
  const [cursorPos, setCursorPos] = createSignal({x: 0, y:0})
  const [cursor, setCursor] = createSignal(["", ""])
  const [squareSize, setSquareSize] = createSignal(16)
  const [startPos, setStartPos] = createSignal([
    'r','n','b','q','k','b','n','r',
    'p','p','p','p','p','p','p','p',
    'e','e','e','e','e','e','e','e',
    'e','e','e','e','e','e','e','e',
    'e','e','e','e','e','e','e','e',
    'e','e','e','e','e','e','e','e',
    'P','P','P','P','P','P','P','P',
    'R','N','B','Q','K','B','N','R',
  ])
  const [currentPos, setCurrentPos] = createSignal([
    'r','n','b','q','k','b','n','r',
    'p','p','p','p','p','p','p','p',
    'e','e','e','e','e','e','e','e',
    'e','e','e','e','e','e','e','e',
    'e','e','e','e','e','e','e','e',
    'e','e','e','e','e','e','e','e',
    'P','P','P','P','P','P','P','P',
    'R','N','B','Q','K','B','N','R',
  ])

  const changeCurrentPos = (from: number, to: number) => {
    var temp = currentPos()
    var piece = temp[from]
    temp[from] = 'e'
    temp[to] = piece
    setCurrentPos(temp)
  }

  const [activeSquare, setActiveSquare] = createSignal(["start", false])

  const changeActiveSquare = ([square, clicked]) => {
    setActiveSquare([square, clicked])
  }

  // "white" | "black" | "opponent"
  const [turn, setTurn] = createSignal("white")
  const changeTurn = (color) => {
    setTurn(color)
  }

  const [legalWhite, setLegalWhite] = createSignal(Array.from({length: 64}, (_, i) => []))

  const [legalBlack, setLegalBlack] = createSignal(Array.from({length: 64}, (_, i) => []))

  const changeLegalWhite = (index, moves) => {
    var temp = legalWhite()
    temp[index] = [...moves]
    setLegalWhite(temp)
  }
  const changeLegalBlack = (index, moves) => {
    var temp = legalBlack()
    temp[index] = [...moves]
    setLegalBlack(temp)
  }

  (() => changeLegalBlack(1, [1, 1+2*8-1, 1+2*8+1]))();
  (() => changeLegalBlack(6, [6, 6+2*8-1, 6+2*8+1]))();
  for (var i = 0; i < 8; i++) {
    (() => changeLegalBlack(8+i, [8+i, (8+i + 8), (8+i + 2*8)]))();
  }
  (() => changeLegalBlack(16, [8, 16]))();

  (() => changeLegalWhite(57, [57,40,42]))();
  (() => changeLegalWhite(62, [62,45,47]))();
  for (var i = 0; i < 8; i++) {
    (() => changeLegalWhite(48+i, [48+i, (48+i - 8), (48+i - 2*8)]))();
  }
  (() => changeLegalWhite(47, [55, 47]))();

  const changeSquareSize = (size) => {
    setSquareSize(size)
  }

  const changeCursor = (cursor) => {
    //console.log("cursor")
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

  var setupPos = [];
  startPos().map(square => {
    switch (square) {
      case 'r':
        setupPos.push(brook)
        break;
      case 'n':
        setupPos.push(bknight)
        break;
      case 'b':
        setupPos.push(bbishop)
        break;
      case 'q':
        setupPos.push(bqueen)
        break;
      case 'k':
        setupPos.push(bking)
        break;
      case 'p':
        setupPos.push(bpawn)
        break;
      case 'R':
        setupPos.push(wrook)
        break;
      case 'N':
        setupPos.push(wknight)
        break;
      case 'B':
        setupPos.push(wbishop)
        break;
      case 'Q':
        setupPos.push(wqueen)
        break;
      case 'K':
        setupPos.push(wking)
        break;
      case 'P':
        setupPos.push(wpawn)
        break;
      default:
        setupPos.push("")
    }
  })


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
    //console.log("pos", pos())
  }

  const white="white"
  const black="rgb(156 163 175)"
  const oddrank = [].concat(... new Array(4).fill([white, black]))
  const evenrank = [].concat(... new Array(4).fill([black, white]))

  setPos(setupPos);

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
                  legalWhite={legalWhite()}
                  changeLegalWhite={changeLegalWhite}
                  legalBlack={legalBlack()}
                  changeLegalBlack={changeLegalBlack}
                  last={last()}
                  changeLast={changeLast}
                  activeSquare={activeSquare()}
                  changeActiveSquare={changeActiveSquare}
                  turn={turn()}
                  changeTurn={changeTurn}
                  currentPos={currentPos()}
                  changeCurrentPos={changeCurrentPos}
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
