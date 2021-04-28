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

export function getIndexOfGrassToEat(state: GameState | GameView) {
  const player = state.players.find(p => p.color === state.activePlayer)
  if (!player) return -1
  return state.board.grass.findIndex(grass => player.diplos.some(diplo => grass.x === diplo.x && grass.y === diplo.y))
}

export function eatGrass(state: GameState) {
  const grassIndex = getIndexOfGrassToEat(state)
  const [grass] = state.board.grass.splice(grassIndex, 1)
  applyGrassEffect(state, grass.effect)
}

export function eatGrassInView(state: GameView, move: EatGrassView) {
  const grassIndex = getIndexOfGrassToEat(state)
  state.board.grass.splice(grassIndex, 1)
  applyGrassEffect(state, move.effect)
}

export function applyGrassEffect(state: GameState | GameView, effect: GrassEffect) {
  const player = state.players.find(p => p.color === state.activePlayer)!
  if (effect !== GrassEffect.Yummy) {
    state.pendingEffect = effect
  }
  player.grass.push(effect)
}