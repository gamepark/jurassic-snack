import GameState from '../GameState'
import GameView from '../GameView'
import PlayerColor from '../PlayerColor'
import MoveType from './MoveType'

type ChangeActivePlayer = {
  type: MoveType.ChangeActivePlayer
}

export default ChangeActivePlayer

export const changeActivePlayerMove: ChangeActivePlayer = {type: MoveType.ChangeActivePlayer}

export function changeActivePlayer(state: GameState | GameView) {
  state.activePlayer = state.activePlayer === PlayerColor.Blue ? PlayerColor.Yellow : PlayerColor.Blue
  state.remainingActions = 2
  state.emptyTurn++
}