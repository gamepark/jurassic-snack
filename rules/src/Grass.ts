import Coordinates from './Coordinates'
import GrassEffect from './GrassEffect'

type Grass = {
  effect: GrassEffect
} & Coordinates

export default Grass

export function getGrassView({effect, ...coordinates}: Grass): Coordinates {
  return coordinates
}