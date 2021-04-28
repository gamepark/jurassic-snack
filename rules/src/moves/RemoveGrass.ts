import Coordinates from '../Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type RemoveGrass = {
  type: MoveType.RemoveGrass
} & Coordinates

export default RemoveGrass

export function removeGrass(state: GameState | GameView, move: RemoveGrass) {
  console.log(state)
  console.log(move)
}