/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import GameView from '@gamepark/jurassic-snack/GameView'
import {Letterbox} from '@gamepark/react-components'
import PastureBoard from "./PastureBoard";
import Coordinates from "@gamepark/jurassic-snack/Coordinates";

const PASTURE_SIZE = 50

type Props = {
    game: GameView
}

export default function GameDisplay({game}: Props) {

    return (
        <Letterbox css={letterBoxStyle} top={0}>
            {game.board.pastures.map(pasture => <PastureBoard key = {pasture.id}
                                                              pasture = {pasture}
                                                              css = {pasturePosition(pasture)}/>)}
        </Letterbox>
    )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`
/*const jsonCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;`;*/

const pasturePosition = (coords: Coordinates) => css`
  height: ${PASTURE_SIZE}%;
  width: ${9 / 16 * PASTURE_SIZE}%;
  position: absolute;
  left: ${10 + coords.x * 9 / 16 * PASTURE_SIZE}%;
  top: ${10 + coords.y * PASTURE_SIZE}%;
`;