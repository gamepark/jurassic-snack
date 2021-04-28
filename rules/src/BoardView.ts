import Board from './Board'
import Coordinates from './Coordinates'

type BoardView = Omit<Board, 'grass'> & {
  grass: Coordinates[]
}

export default BoardView