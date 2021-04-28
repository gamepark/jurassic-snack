import Board from './Board'
import GrassEffect from './GrassEffect'
import PlayerColor from './PlayerColor'
import PlayerState from './PlayerState'

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  board: Board
  players: PlayerState[]
  activePlayer?: PlayerColor
  remainingActions: number,
  pendingEffect?: Exclude<GrassEffect, GrassEffect.Yummy>
  emptyTurn: number
}

export default GameState