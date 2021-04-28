import Board from './Board'
import Coordinates from './Coordinates'

export function hasTRex(board: Board, {x, y}: Coordinates) {
  return board.tRex.some(tRex => tRex.x === x && tRex.y === y)
}