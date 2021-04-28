import Coordinates from './Coordinates'

enum Direction {
  TOP, RIGHT, BOTTOM, LEFT
}

export default Direction

export const directions = Object.values(Direction).filter(isDirection)

function isDirection(arg: string | Direction): arg is Direction {
  return typeof arg === 'number'
}

export function getDirectionCoordinates(origin: Coordinates, direction: Direction, distance: number) {
  switch (direction) {
    case Direction.TOP:
      return {x: origin.x, y: origin.y - distance}
    case Direction.RIGHT:
      return {x: origin.x + distance, y: origin.y}
    case Direction.BOTTOM:
      return {x: origin.x, y: origin.y + distance}
    case Direction.LEFT:
      return {x: origin.x - distance, y: origin.y}
  }
}