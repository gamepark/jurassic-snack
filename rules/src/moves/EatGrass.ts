import GameState from '../GameState'
import GameView from '../GameView'
import GrassEffect from '../GrassEffect'
import MoveType from './MoveType'

type EatGrass = {
  type: MoveType.EatGrass
}

export default EatGrass

export const eatGrassMove: EatGrass = {type: MoveType.EatGrass}

export type EatGrassView = EatGrass & {
  effect: GrassEffect
}

export function eatGrass(state: GameState) {
  console.log(state)
}

export function eatGrassInView(state: GameView, move: EatGrassView) {
  console.log(state)
  console.log(move)
}