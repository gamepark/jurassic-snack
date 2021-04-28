import EatGrass, {EatGrassView} from './EatGrass'
import {LookAtGrassView} from './LookAtGrass'
import Move from './Move'

/**
 * A "MoveView" is the combination of all the types of move views that exists in you game.
 * It usually derives from "Move". You can exclude some Move using: = Exclude<Move, MoveToExclude | OtherMoveToExclude> | MoveToInclude...
 */
type MoveView = Exclude<Move, EatGrass> | EatGrassView | LookAtGrassView

export default MoveView