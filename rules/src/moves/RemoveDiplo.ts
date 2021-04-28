import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type RemoveDiplo = {
  type: MoveType.RemoveDiplo
  diplo: number
}

export default RemoveDiplo

export function removeDiplo(state: GameState | GameView, move: RemoveDiplo) {
  console.log(state)
  console.log(move)
}