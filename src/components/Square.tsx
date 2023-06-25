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
        props.changePos(props.last, "")
        var m = props.currentPos[props.last]
        console.log("moved piece", m)
        props.changeMovedPiece(m)
        console.log("moved piece after", props.movedPiece)
        props.changeOneCurrentPos('e', props.last)
        //setPiece("")
      }}
      onMouseUp={() => {
        console.log("last",props.last)
        console.log("moved piece mouse up",props.movedPiece)
        if (props.last == props.name) {
          console.log("same")
          props.changePos(props.last, props.cursor)
          props.changeOneCurrentPos(props.movedPiece, props.last)
        //setPiece("")
          props.changeLast("same")
        } else {
          props.changeActiveSquare(["stop", false])
          if (legal()[props.last].includes(props.name)) {
            //console.log(props.legal[props.last])
            setPiece(() => props.cursor)
            setSquare(props.cursor)
            props.changePos(props.name, props.cursor)
            props.changeOneCurrentPos(props.movedPiece, props.name)
            console.log(props.currentPos.slice(0,8))
            console.log(props.currentPos.slice(8, 2*8))
            console.log(props.currentPos.slice(2*8, 3*8))
            console.log(props.currentPos.slice(3*8, 4*8))
            console.log(props.currentPos.slice(4*8, 5*8))
            console.log(props.currentPos.slice(5*8, 6*8))
            console.log(props.currentPos.slice(6*8, 7*8))
            console.log(props.currentPos.slice(7*8, 8*8))
            console.log("move done", props.last, props.name,  props.movedPiece)
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
            //console.log("fromy: ",fromy, (props.last+1)%8)

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
            var thiscolorstones = []
            var othercolorstones = []
            if (props.turn == "white") {
              thiscolorstones = ['P','R','N','B','Q','K']
              othercolorstones = ['p','r','n','b','q','k']
            } else if (props.turn == "black") {
              thiscolorstones = ['p','r','n','b','q','k']
              othercolorstones = ['P','R','N','B','Q','K']

            }



            if (props.turn == "white") {
              switch(props.movedPiece) {
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
                        (othercolorstones.includes(props.currentPos[to-lr])
                        )) {
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
              switch(props.movedPiece) {
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
                        othercolorstones.includes(props.currentPos[to+lr])
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

            //get bishop squares
            var i1, i2, i3, i4 = 0
            if ((9-fromx) <= fromy) {
              i1 = 8-fromx
            } else {
              i1 = fromy-1
            }
            if (fromx <= fromy) {
              i2 = fromx-1
            } else {
              i2 = fromy-1
            }
            if (fromx <= (9-fromy)) {
              i3 = fromx-1
            } else {
              i3 = 8-fromy
            }
            if ((9-fromx) <= (9-fromy)) {
              i4 = 8-fromx
            } else {
              i4 = 8-fromy
            }
            var bfrom1 = []
            for (var ii=1; ii<=i1; ii++) {
              bfrom1.push(from-(ii*8)+ii)
            }
            var bfrom2 = []
            for (var ii=1; ii<=i2; ii++) {
              bfrom2.push(from-(ii*8)-ii)
            }
            var bfrom3 = []
            for (var ii=1; ii<=i3; ii++) {
              bfrom3.push(from+(ii*8)-ii)
            }
            var bfrom4 = []
            for (var ii=1; ii<=i4; ii++) {
              bfrom4.push(from+(ii*8)+ii)
            }
            //console.log("bfrom", bfrom1, bfrom2, bfrom3, bfrom4)

            //get piece on bishop squares
            if (props.turn == "white") {
              switch(props.movedPiece) {
                case 'P':
                  var newsquares = []
                  var first = true
                  var lines = [[bfrom1, bfrom3], [bfrom2, bfrom4], [bfrom3, bfrom1], [bfrom4, bfrom2]]
                  for (var s of lines) {
                    for (var ss of  s[0]) {
                      if (first) {newsquares = [...s[1].reverse() , from]}
                      first = false
                      // search first quadrant for bishop
                      if (props.currentPos[ss] == 'e') {
                        newsquares.push(ss)
                        continue;
                      }
                      if (['B','Q'].includes(props.currentPos[ss])) {
                        var newlegalmoves = []
                        var newsquaresminus = newsquares.reverse().slice(1)
                        console.log("newsquares",newsquaresminus)
                        for (var testlegal of newsquaresminus) {
                        console.log("testlegal", testlegal)
                          if (props.currentPos[testlegal] == 'e') {
                            newlegalmoves.push(testlegal)
                          } else if (othercolorstones.includes(props.currentPos[testlegal])) {

                            newlegalmoves.push(testlegal)
                            break;
                          }
                        }
                        newlegalmoves.push(from)
                        if (props.legalWhite[ss].includes(ss)) {

                        props.changeLegalWhite(ss, [...props.legalWhite[ss], ...newlegalmoves])
                        } else {
                        props.changeLegalWhite(ss, [...props.legalWhite[ss], ...newlegalmoves, ss])
                        }
                      }
                      break;
                    }
                    first = true
                  }
                  break;
                }
            }

            //get rook squares
            var rto1 = []
            for (var i=tox+1; i<9; i++) {
              rto1.push(to-tox+i)
            }
            var rto2 = []
            for (var i=1; i<toy; i++) {
              rto2.push(tox-1 + 8*(i-1))
            }
            var rto3 = []
            for (var i=1; i<tox; i++) {
              rto3.push(to-tox+i)
            }
            var rto4 = []
            for (var i=toy+1; i<9; i++) {
              rto4.push(tox-1 + 8*(i-1))
            }

            //console.log("rook squares", rto1, rto2, rto3, rto4, tox, toy)

            // TODO:
            // update moved to square

            function compareNumbers(a, b) {
              return a - b;
            }
            if (props.turn == "white") {
              props.changeLegalWhite(to, [to])
              switch(props.movedPiece) {
                case 'R':
                  console.log("rook move")
                  for (var r of [rto1, rto2.sort(compareNumbers).reverse(), rto3.sort(compareNumbers).reverse(), rto4]) {
                    for (var s of r) {
                      if (props.currentPos[s] == 'e') {
                        props.changeLegalWhite(to, [...props.legalWhite[to], s])
                        continue;
                      }
                      if (othercolorstones.includes(props.currentPos[s])) {
                        props.changeLegalWhite(to, [...props.legalWhite[to], s])
                        break;
                      } else {
                        break;
                      }
                      console.log("rook", r, s, props.currentPos[s])
                    }
                  }
                  break;
              }
            }


            //moved to square -> blocking
            if (props.turn == "white") {
              var r = []
              r = rto1
              for (var s of r) {
                if (props.currentPos[s] == 'e') {
                  continue;
                }
                if (
                  (props.currentPos[s] == 'R') ||
                  (props.currentPos[s] == 'Q')
                  ) {
                  //console.log(rto3, s)
                  props.changeLegalWhite(s, [...props.legalWhite[s]].filter(i => ![...rto3, to].includes(i)))
                }
              }
                  //get bishop squares
                  //get knight squares
            }

            //props.changeOneCurrentPos(props.last, props.name)
            //console.log(props.currentPos)

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
