import Coordinates from '../Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type MoveDiplo = {
  type: MoveType.MoveDiplo
  diplo: number
} & Coordinates

export default MoveDiplo

export function moveDiploMove(diplo: number, coordinates: Coordinates): MoveDiplo {
  return {type: MoveType.MoveDiplo, diplo, ...coordinates}
}

export function moveDiplo(state: GameState | GameView, move: MoveDiplo) {
  console.log(state)
  console.log(move)
}