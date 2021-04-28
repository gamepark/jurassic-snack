import Coordinates from './Coordinates'
import Direction from './Direction'

type Pasture = {
  id: number
  direction: Direction
} & Coordinates

export default Pasture