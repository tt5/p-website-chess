import { createSignal, For, createEffect } from "solid-js";

export default function Square(props) {
  const [square, setSquare] = createSignal(["", ""]);
  const [ref, setRef] = createSignal()
  const [border, setBorder] = createSignal(false)
  const [active, setActive] = createSignal(false)
  const [piece, setPiece] = createSignal(props.piece)
  const [legal, setLegal] = createSignal(props.legalWhite)

  createEffect(() => {
    setSquare(props.piece)
    if (props.turn == "white") {
      setLegal(props.legalWhite)
    } else if (props.turn == "black") {
      setLegal(props.legalBlack)
    } else if (props.trun == "opponent") {
      setLegal(Array.from({length: 64}, (_, i) => []))
    };
    props.last;
    props.activeSquare;
    //console.log("activeSquare", props.activeSquare)
    if (props.activeSquare[0] == props.name) {
      setActive(props.activeSquare[1])
    } else {
      setActive(false)
    }
    setSquare(props.pos[props.name]);
    if (legal()[props.last]) {
      const tlegal = legal()[props.last].includes(props.name)
      if (props.activeSquare[1]) {setBorder(tlegal)} else {setBorder(false)}
    }
  })

  return (
    <div
      ref={setRef}
      class={
      ` border border-2` +
      ` ${border() ? "!border-yellow-400" : ""}` +
      ` ${active() ? "!bg-yellow-400" : ""}`
      }
      style={
      `background-color: ${props.color}; ` +
      `border-color: ${props.color}`
      }
      onMouseDown={() => {

        if (props.activeSquare[0] == props.name) {
          //props.changeActiveSquare([props.name, true])
        } else {
          if (legal()[props.name].includes(props.name)) {
            props.changeActiveSquare([props.name, true])
          } else {
            props.changeActiveSquare([props.name, false])
          }
        }
        //if piece can move empty square
        props.changeLast(props.name)
        setSquare("")
        props.size(ref().offsetWidth)
        props.changeCursor(props.pos[props.name])
        //setPiece("")
      }}
      onMouseUp={() => {
        console.log(props.last)
        if (props.last == props.name) {
          props.changeLast("same")
        } else {
          props.changeActiveSquare(["stop", false])
          if (legal()[props.last].includes(props.name)) {
            //console.log(props.legal[props.last])
            setPiece(() => props.cursor)
            setSquare(props.cursor)
            props.changePos(props.last, "")
            props.changePos(props.name, props.cursor)
            var movedPiece = props.currentPos[props.last]
            console.log("move done", props.last, props.name,  movedPiece)
            const changeLegal = (index, moves) => {
              if (props.turn == "white") {
                props.changeLegalWhite(index, moves)
              } else if (props.turn == "black") {
                props.changeLegalBlack(index, moves)
              }
            }

            //now empty field has no legal moves
            changeLegal(props.last, [])
            console.log("last x", (props.last % 8)+1)
            console.log("last y",
              (((props.last+1)-((props.last+1) % 8))/8)+1
            )

            //TODO legal moves

            // update empty square
            
            // update new piece position


            props.changeCurrentPos(props.last, props.name)

            if (props.turn == "white") {
              props.changeTurn("black")
            } else if (props.turn == "black") {
              props.changeTurn("white")
            }
            props.changeLast(props.name)
          } else {
            console.log("put piece back")
            props.changePos(props.last, props.cursor)
            props.changeLast(props.name)
          }
        }
        props.changeCursor("")
      }}
      onMouseEnter={() => {
      }}
    >
    <svg class="square" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="100%" height="100%" viewBox="0 0 45 45">
          <g style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
            <For each={square()} fallback="">
            {(i) => <path d={i[0]} style={i[1]}/>
            }
            </For>
          </g>
</svg>
    </div>
  );
}
