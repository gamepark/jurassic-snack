import Coordinates from '../Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type MoveTRex = {
  type: MoveType.MoveTRex
  tRex: number
} & Coordinates

export default MoveTRex

export function moveTRex(state: GameState | GameView, move: MoveTRex) {
  console.log(state)
  console.log(move)
}