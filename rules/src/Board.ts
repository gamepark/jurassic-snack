import Coordinates from './Coordinates'
import Grass from './Grass'
import Pasture from './Pasture'

type Board = {
  pastures: Pasture[]
  grass: Grass[]
  tRex: Coordinates[]
}

export default Board