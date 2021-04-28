import Coordinates from './Coordinates'
import {directions, getDirectionCoordinates} from './Direction'
import GameState from './GameState'
import {hasGrass} from './Grass'
import {outsidePlayingArea} from './Pasture'
import PlayerState from './PlayerState'
import {hasTRex} from './TRex'

export function getDiploAvailableDestinations(state: GameState, position: Coordinates): Coordinates[] {
  const destinations: Coordinates[] = []
  for (const direction of directions) {
    let distance = 0
    while (true) {
      const nextSpace = getDirectionCoordinates(position, direction, distance + 1)
      if (hasGrass(state.board, nextSpace)) {
        destinations.push(nextSpace)
        break
      }
      if (diploBlocked(state, nextSpace)) {
        if (distance > 0) {
          destinations.push(getDirectionCoordinates(position, direction, distance))
        }
        break
      }
      distance++
    }
  }
  return destinations
}

export function diploBlocked(state: GameState, coordinates: Coordinates) {
  return hasDiplo(state.players, coordinates) || hasTRex(state.board, coordinates) || outsidePlayingArea(state.board.pastures, coordinates)
}

export function hasDiplo(players: PlayerState[], {x, y}: Coordinates) {
  return players.some(player => player.diplos.some(diplo => diplo.x === x && diplo.y === y))
}