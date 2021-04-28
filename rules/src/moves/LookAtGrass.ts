import Coordinates from '../Coordinates'
import GrassEffect from '../GrassEffect'
import MoveType from './MoveType'

type LookAtGrass = {
  type: MoveType.LookAtGrass
} & Coordinates

export default LookAtGrass

export type LookAtGrassView = LookAtGrass & {
  effect: GrassEffect
}