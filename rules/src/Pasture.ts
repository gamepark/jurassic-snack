import shuffle from 'lodash.shuffle'
import Coordinates from './Coordinates'
import Direction from './Direction'
import PlayerColor from './PlayerColor'

type Pasture = {
  id: number
  direction: Direction
} & Coordinates

export default Pasture

type PastureDescription = {
  [key in PlayerColor]: Coordinates
}

export const PASTURE_SIZE = 3

export const pasturesDescriptions: PastureDescription[] = [{
  [PlayerColor.Blue]: {x: 1, y: 1},
  [PlayerColor.Yellow]: {x: 1, y: 2}
}, {
  [PlayerColor.Blue]: {x: 0, y: 1},
  [PlayerColor.Yellow]: {x: 2, y: 1}
}, {
  [PlayerColor.Blue]: {x: 2, y: 2},
  [PlayerColor.Yellow]: {x: 0, y: 0}
}, {
  [PlayerColor.Blue]: {x: 1, y: 2},
  [PlayerColor.Yellow]: {x: 1, y: 1}
}]

export function setupPastures(): Pasture[] {
  const pastures = shuffle([...pasturesDescriptions.keys()])
  return [
    {id: pastures[0], x: 0, y: 0, direction: Math.floor(Math.random() * 4)},
    {id: pastures[1], x: 1, y: 0, direction: Math.floor(Math.random() * 4)},
    {id: pastures[2], x: 0, y: 1, direction: Math.floor(Math.random() * 4)},
    {id: pastures[3], x: 1, y: 1, direction: Math.floor(Math.random() * 4)}
  ]
}

export function pastureRotate(coordinates: Coordinates, direction: Direction): Coordinates {
  switch (direction) {
    case Direction.TOP:
      return coordinates
    case Direction.RIGHT:
      return {x: 2 - coordinates.y, y: coordinates.x}
    case Direction.BOTTOM:
      return {x: 2 - coordinates.x, y: 2 - coordinates.y}
    case Direction.LEFT:
      return {x: coordinates.y, y: 2 - coordinates.x}
  }
}

export function setupDiplos(pastures: Pasture[], color: PlayerColor): Coordinates[] {
  return pastures.map(pasture => {
    const position = pastureRotate(pasturesDescriptions[pasture.id][color], pasture.direction)
    return {x: pasture.x * PASTURE_SIZE + position.x, y: pasture.y * PASTURE_SIZE + position.y}
  })
}

export function outsidePlayingArea(pastures: Pasture[], coordinates: Coordinates) {
  return pastures.every(pasture => coordinates.x < pasture.x * PASTURE_SIZE
    || coordinates.x >= pasture.x * PASTURE_SIZE + PASTURE_SIZE
    || coordinates.y < pasture.y * PASTURE_SIZE
    || coordinates.y >= pasture.y * PASTURE_SIZE + PASTURE_SIZE
  )
}