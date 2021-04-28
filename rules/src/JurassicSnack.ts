import {SecretInformation, SequentialGame} from '@gamepark/rules-api'
import GameState from './GameState'
import GameView from './GameView'
import {getGrassView, setupGrass} from './Grass'
import {isGameOptions, JurassicSnackOptions} from './JurassicSnackOptions'
import {changeActivePlayerMove} from './moves/ChangeActivePlayer'
import {eatGrass, eatGrassMove} from './moves/EatGrass'
import Move from './moves/Move'
import MoveDiplo, {moveDiplo, moveDiploMove} from './moves/MoveDiplo'
import MoveTRex from './moves/MoveTRex'
import MoveType from './moves/MoveType'
import MoveView from './moves/MoveView'
import {setupDiplos, setupPastures} from './Pasture'
import PlayerColor, {playerColors} from './PlayerColor'

/**
 * Rules of Jurassic Snack that will run on Game Park's servers
 */
export default class JurassicSnack extends SequentialGame<GameState, Move, PlayerColor>
  implements SecretInformation<GameState, GameView, Move, MoveView, PlayerColor> {
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(state: GameState)
  /**
   * This constructor is called when a new game is created. If your game has options, or a variable number of players, it will be provided here.
   * @param options The options of the new game
   */
  constructor(options: JurassicSnackOptions)
  /**
   * In here you must code the construction of your class. Use a "typeguard" to distinguish a new game from a restored game.
   * @param arg The state of the game, or the options when starting a new game
   */
  constructor(arg: GameState | JurassicSnackOptions) {
    if (isGameOptions(arg)) {
      const pastures = setupPastures()
      super({
        board: {pastures, grass: setupGrass(pastures), tRex: []},
        players: playerColors.map(color => ({color, diplos: setupDiplos(pastures, color), grass: []})),
        activePlayer: PlayerColor.Blue, remainingActions: 1, emptyTurn: 0
      })
    } else {
      super(arg)
    }
  }

  /**
   * @return True when game is over
   */
  isOver(): boolean {
    return this.state.activePlayer === undefined
  }

  /**
   * Retrieves the player which must act. It is used to secure the game and prevent players from acting outside their turns.
   * Only required in a SequentialGame.
   * @return The identifier of the player whose turn it is
   */
  getActivePlayer(): PlayerColor | undefined {
    return this.state.activePlayer
  }

  /**
   * Return the exhaustive list of moves that can be played by the active player.
   * This is used for 2 features:
   * - security (preventing unauthorized moves from being played);
   * - "Dummy players": when a player leaves a game, it is replaced by a "Dummy" that plays random moves, allowing the other players to finish the game.
   * In a SimultaneousGame, as multiple players can be active you will be passed a playedId as an argument.
   * If the game allows a very large (or infinite) number of moves, instead of implementing this method, you can implement instead:
   * - isLegal(move: Move):boolean, for security; and
   * - A class that implements "Dummy" to provide a custom Dummy player.
   */
  getLegalMoves(): Move[] {
    const player = this.state.players.find(player => player.color === this.state.activePlayer)
    if (!player) return []
    if (this.state.pendingEffect) {
      return [] // TODO: Birth, Recon, Air Travel, Air Raid, Volcanic Eruption
    } else {
      const moves: (MoveDiplo | MoveTRex)[] = []
      player.diplos.forEach((coordinates, diplo) => {
        // TODO: rules for legal diplo moves
        moves.push(moveDiploMove(diplo, {x: coordinates.x + 1, y: coordinates.y + 1}))
        moves.push(moveDiploMove(diplo, {x: coordinates.x + 1, y: coordinates.y - 1}))
        moves.push(moveDiploMove(diplo, {x: coordinates.x - 1, y: coordinates.y + 1}))
        moves.push(moveDiploMove(diplo, {x: coordinates.x - 1, y: coordinates.y - 1}))
      })
      // TODO: add TRex moves
      return moves
    }
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move): void {
    switch (move.type) {
      case MoveType.MoveDiplo:
        return moveDiplo(this.state, move)
      case MoveType.EatGrass:
        return eatGrass(this.state)
      // TODO all other cases
    }
  }

  /**
   * Here you can return the moves that should be automatically played when the game is in a specific state.
   * Here is an example from monopoly: you roll a dice, then move you pawn accordingly.
   * A first solution would be to do both state updates at once, in a "complex move" (RollDiceAndMovePawn).
   * However, this first solution won't allow you to animate step by step what happened: the roll, then the pawn movement.
   * "getAutomaticMove" is the solution to trigger multiple moves in a single action, and still allow for step by step animations.
   * => in that case, "RollDice" could set "pawnMovement = x" somewhere in the game state. Then getAutomaticMove will return "MovePawn" when
   * "pawnMovement" is defined in the state.
   * Of course, you must return nothing once all the consequences triggered by a decision are completed.
   * VERY IMPORTANT: you should never change the game state in here. Indeed, getAutomaticMove will never be called in replays, for example.
   *
   * @return The next automatic consequence that should be played in current game state.
   */
  getAutomaticMove(): void | Move {
    const activePlayer = this.state.players.find(p => p.color === this.state.activePlayer)
    if (activePlayer) {
      for (const {x, y} of activePlayer.diplos) {
        if (this.state.board.grass.some(grass => grass.x === x && grass.y === y)) {
          return eatGrassMove
        }
      }
    }
    if (!this.state.remainingActions) {
      return changeActivePlayerMove
    }
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(): GameView {
    return {
      ...this.state,
      board: {...this.state.board, grass: this.state.board.grass.map(getGrassView)}
    }
  }

  /**
   * If you game has "SecretInformation", you must also implement "getPlayerView", returning the information visible by a specific player.
   * @return what the player can see
   */
  getPlayerView(): GameView {
    return this.getView() // Secret information is only carried by the moves in this case
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @return What a person should know about the move that was played
   */
  getMoveView(move: Move): MoveView {
    switch (move.type) {
      case MoveType.EatGrass:
        const activePlayer = this.state.players.find(p => p.color === this.state.activePlayer)!
        return {...move, effect: activePlayer.grass[activePlayer.grass.length - 1]}
      default:
        return move
    }
  }

  /**
   * If you game has secret information, sometime you need to alter a Move depending on which player it is.
   * For example, if a card is drawn, the id of the revealed card should be ADDED to the Move in the MoveView, but only for the played that draws!
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @param playerId Identifier of the player seeing the move
   * @return What a person should know about the move that was played
   */
  getPlayerMoveView(move: Move, playerId: PlayerColor): MoveView {
    if (this.state.activePlayer === playerId && move.type === MoveType.LookAtGrass) {
      return {...move, effect: this.state.board.grass.find(grass => grass.x === move.x && grass.y === move.y)!.effect}
    } else {
      return this.getMoveView(move)
    }
  }
}