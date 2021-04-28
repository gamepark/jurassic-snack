import Birth from './Birth'
import ChangeActivePlayer from './ChangeActivePlayer'
import EatGrass from './EatGrass'
import LookAtGrass from './LookAtGrass'
import MoveDiplo from './MoveDiplo'
import MoveTRex from './MoveTRex'
import PlaceTRex from './PlaceTRex'
import RemoveDiplo from './RemoveDiplo'
import RemoveGrass from './RemoveGrass'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = MoveDiplo | EatGrass | ChangeActivePlayer | Birth | LookAtGrass | PlaceTRex | RemoveDiplo | MoveTRex | RemoveGrass

export default Move