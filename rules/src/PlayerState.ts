import Coordinates from './Coordinates'
import GrassEffect from './GrassEffect'
import PlayerColor from './PlayerColor'

export default interface PlayerState {
  color: PlayerColor
  diplos: Coordinates[]
  grass: GrassEffect[]
}