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

            const hulp = (a) => {
              if ( ((a+1) % 8) == 0 ){
                return 8
              }
              return (a+1) % 8
            }

            var from = props.last
            var fromx = (props.last % 8)+1
            var fromy = (((props.last+1)-hulp(props.last))/8)+1
            console.log("fromy: ",fromy, (props.last+1)%8)

            var to = props.name
            var tox = (props.name % 8)+1
            var toy = (((props.name+1)-hulp(props.name))/8)+1

            //get knight squares
            var nfrom = [
              ((fromx+2) < 9) && ((fromy-1) > 0) && from + 2 - 8,
              ((fromx+1) < 9) && ((fromy-2) > 0) && from + 1 - 16,
              ((fromx-1) > 0) && ((fromy-2) > 0) && from - 1 - 16,
              ((fromx-2) > 0) && ((fromy-1) > 0) && from - 2 - 8,
              ((fromx-2) > 0) && ((fromy+1) < 9) && from - 2 + 8,
              ((fromx-1) > 0) && ((fromy+2) < 9) && from - 1 + 16,
              ((fromx+1) < 9) && ((fromy+2) < 9) && from + 1 + 16,
              ((fromx+2) < 9) && ((fromy+1) < 9) && from + 2 + 8,
            ]

            //empty square is now a legal move for knight of same color
            nfrom.map((square) => {
              if (square) {
                var piece = props.currentPos[square]
                if (props.turn == "white") {
                  if (piece == 'N') {
                    props.changeLegalWhite(square, [...props.legalWhite[square], from])
                  }
                } else if (props.turn == "black") {
                  if (piece == 'n') {
                    props.changeLegalBlack(square, [...props.legalBlack[square], from])
                  }
                }
                console.log(square, props.currentPos[square])
              }
            })
            //TODO
            //find knight of player color and update legal moves

            //get rook squares
            var rfrom1 = []
            for (var i=fromx+1; i<9; i++) {
              rfrom1.push(from-fromx+i)
            }
            var rfrom2 = []
            for (var i=1; i<fromy; i++) {
              rfrom2.push(fromx-1 + 8*(i-1))
            }
            var rfrom3 = []
            for (var i=1; i<fromx; i++) {
              rfrom3.push(from-fromx+i)
            }
            var rfrom4 = []
            for (var i=fromy+1; i<9; i++) {
              rfrom4.push(fromx-1 + 8*(i-1))
            }

//console.log(rfrom1, rfrom2, rfrom3,rfrom4, fromx, fromy, tox, toy)
            if (
              props.currentPos[rfrom4[0]] == 'k') {
              if (props.turn == "white") {
                console.log("move away from black king")
              } else if (props.trun == "black") {
                console.log("move towards black king")
              }
            } else if (
              props.currentPos[rfrom4[0]] == 'K'
            ) {
              if (props.turn == "white") {
                console.log("move away from white king")
              } else if (props.trun == "black") {
                console.log("move towards white king")
              }
            } else {
              for (const ss of rfrom4){
                //const piece = props.currentPos[ss]
                if (ss.length !== 0) {
                  console.log(rfrom4, ss)
                  if (props.currentPos[ss] == 'e') {
                    continue;
                  }
                  if (
                    props.currentPos[ss] == 'R' ||
                    props.currentPos[ss] == 'Q') {
                    if (props.turn == "white") {
                      if (fromx == tox && toy < fromy) {
                        //move away from R or Q
                        props.changeLegalWhite(ss, [
                          ss,
                          ...Array.from({ length: (fromy - toy) },
                            (v, i) => ((fromy - 1 - i)*8+fromx-1)),
                          ...props.legalWhite[ss]
                        ]);
                      } else {
                      }
                    }
                  }              
                }
              }
            }

            if (props.turn == "white") {
              switch(movedPiece) {
                case 'P':
                  if (toy > 1) {
                    var newlegal = []
                    var islegal = false
                    if (props.currentPos[to-8]=='e') {
                      props.changeLegalWhite(to, [to-8])
                      newlegal.push(to-8)
                      islegal = true
                    }
                    var leftright = []
                    if ( tox > 1) { leftright.push(9) }
                    if ( tox < 8) { leftright.push(7) }
                    for (const lr of leftright) {
                      if (
                        (props.currentPos[to-lr]=='p') ||
                        (props.currentPos[to-lr]=='r') ||
                        (props.currentPos[to-lr]=='n') ||
                        (props.currentPos[to-lr]=='b') ||
                        (props.currentPos[to-lr]=='q') ||
                        (props.currentPos[to-lr]=='k')
                        ) {
                        newlegal.push(to-lr)
                        islegal = true
                      }
                    }
                    console.log("newlegal1 ",newlegal)
                    islegal && props.changeLegalWhite(to, [to, ...newlegal])
                  }
                  // check square up left, up, up right
                  break;
              }
            } else if (props.turn == "black") {
              console.log("black turn")
              switch(movedPiece) {
                case 'p':
                  console.log("pawn move")
                  // check square down left, down, down right
                  if (toy < 8) {
                    console.log("no promotion")
                    var newlegal = []
                    var islegal = false
                    if (props.currentPos[to+8]=='e') {
                      console.log("can move one forward")
                      props.changeLegalWhite(to, [to+8])
                      newlegal.push(to+8)
                      islegal = true
                    }
                    var leftright = []
                    if ( tox > 1) { leftright.push(9) }
                    if ( tox < 8) { leftright.push(7) }
                    for (const lr of leftright) {
                      if (
                        (props.currentPos[to+lr]=='P') ||
                        (props.currentPos[to+lr]=='R') ||
                        (props.currentPos[to+lr]=='N') ||
                        (props.currentPos[to+lr]=='B') ||
                        (props.currentPos[to+lr]=='Q') ||
                        (props.currentPos[to+lr]=='K')
                        ) {
                        console.log("can capture", lr)
                        newlegal.push(to+lr)
                        islegal = true
                      }
                    }
                    islegal && props.changeLegalBlack(to, [to, ...newlegal])
                  }
                  // check square up left, up, up right
                  break;
              }
            }

            // TODO:
            // update moved to square

            props.changeCurrentPos(props.last, props.name)
            console.log(props.currentPos)

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
