import shuffle from 'lodash.shuffle'
import Board from './Board'
import Coordinates from './Coordinates'
import GrassEffect, {grassEffects} from './GrassEffect'
import Pasture, {PASTURE_SIZE, pastureRotate, pasturesDescriptions} from './Pasture'
import {playerColors} from './PlayerColor'

type Grass = {
  effect: GrassEffect
} & Coordinates

export default Grass

export function getGrassView({effect, ...coordinates}: Grass): Coordinates {
  return coordinates
}

const grassEffectQuantity = {
  [GrassEffect.Birth]: 3,
  [GrassEffect.Recon]: 2,
  [GrassEffect.AirTravel]: 4,
  [GrassEffect.AirRaid]: 3,
  [GrassEffect.VolcanicEruption]: 2,
  [GrassEffect.Surprise]: 2,
  [GrassEffect.Yummy]: 12
}

export function setupGrass(pastures: Pasture[]): Grass[] {
  const grass: Grass[] = []
  const grassTokens = shuffle(grassEffects.flatMap(effect => Array(grassEffectQuantity[effect]).fill(effect)))
  for (const pasture of pastures) {
    const pastureDescription = pasturesDescriptions[pasture.id]
    for (let x = 0; x < PASTURE_SIZE; x++) {
      for (let y = 0; y < PASTURE_SIZE; y++) {
        if (!playerColors.map(color => pastureRotate(pastureDescription[color], pasture.direction)).some(egg => egg.x === x && egg.y === y)) {
          grass.push({x: x + pasture.x * PASTURE_SIZE, y: y + pasture.y * PASTURE_SIZE, effect: grassTokens.pop()})
        }
      }
    }
  }
  return grass
}

export function hasGrass(board: Board, {x, y}: Coordinates) {
  return board.grass.some(grass => grass.x === x && grass.y === y)
}