import { createSignal, For, createEffect } from "solid-js";

export default function Square(props) {
  const [square, setSquare] = createSignal(["", ""]);
  const [ref, setRef] = createSignal()
  const [border, setBorder] = createSignal(false)
  const [active, setActive] = createSignal(false)
  const [piece, setPiece] = createSignal(props.piece)
  setSquare(props.piece)

  createEffect(() => {
    props.last;
    props.activeSquare;
    //console.log("activeSquare", props.activeSquare)
    if (props.activeSquare[0] == props.name) {
      setActive(props.activeSquare[1])
    } else {
      setActive(false)
    }
    setSquare(props.pos[props.name]);
    if (props.legal[props.last]) {
      const legal = props.legal[props.last].includes(props.name)
      if (props.activeSquare[1]) {setBorder(legal)} else {setBorder(false)}
    }
  })

  const bpawn = [
  ["m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z", 
  "opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"]
  ]

  return (
    <div
      ref={setRef}
      class={
      `bg-${props.color}` +
      ` border border-2 border-${props.color}` +
      ` ${border() && "border-yellow-400"}` +
      ` ${active() && "bg-yellow-400"}`
      }
      onMouseDown={() => {

        if (props.activeSquare[0] == props.name) {
          //props.changeActiveSquare([props.name, true])
        } else {
          props.changeActiveSquare([props.name, true])
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
          if (props.legal[props.last].includes(props.name)) {
            console.log(props.legal[props.last])
            setPiece(() => props.cursor)
            setSquare(props.cursor)
            props.changePos(props.last, "")
            props.changePos(props.name, props.cursor)
            props.changeLast(props.name)
          } else {
            console.log("false")
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
