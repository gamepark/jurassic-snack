import Coordinates from '../Coordinates'
import GameState from '../GameState'
import GameView from '../GameView'
import GrassEffect from '../GrassEffect'
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
  const player = state.players.find(p => p.color === state.activePlayer)!
  player.diplos[move.diplo] = {x: move.x, y: move.y}
  if (state.pendingEffect === GrassEffect.AirTravel) {
    delete state.pendingEffect
  } else {
    state.remainingActions--
  }
}