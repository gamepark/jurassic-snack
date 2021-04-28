import Coordinates from '../Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type PlaceTRex = {
  type: MoveType.PlaceTRex
} & Coordinates

export default PlaceTRex

export function placeTRex(state: GameState | GameView, move: PlaceTRex) {
  console.log(state)
  console.log(move)
}