import Coordinates from '../Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type Birth = {
  type: MoveType.Birth
} & Coordinates

export default Birth

export function birth(state: GameState | GameView, move: Birth) {
  console.log(state)
  console.log(move)
}