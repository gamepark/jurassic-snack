import GameView from '@gamepark/jurassic-snack/GameView'
import {eatGrassInView} from '@gamepark/jurassic-snack/moves/EatGrass'
import {moveDiplo} from '@gamepark/jurassic-snack/moves/MoveDiplo'
import MoveType from '@gamepark/jurassic-snack/moves/MoveType'
import MoveView from '@gamepark/jurassic-snack/moves/MoveView'
import {Game} from '@gamepark/rules-api'

/**
 * Rules of Jurassic Snack that will run in players and spectators browsers
 */
export default class JurassicSnackView implements Game<GameView, MoveView> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
  }

  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return MoveView which can be completely anticipated by the player or the spectator
   */
  getAutomaticMove(): void | MoveView {
    return
  }

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.MoveDiplo:
        return moveDiplo(this.state, move)
      case MoveType.EatGrass:
        return eatGrassInView(this.state, move)
      // TODO all other cases
    }
  }

}