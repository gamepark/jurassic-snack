import BoardView from './BoardView'
import GameState from './GameState'

type GameView = Omit<GameState, 'board'> & {
  board: BoardView
}

export default GameView