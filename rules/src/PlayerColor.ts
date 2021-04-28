enum PlayerColor {
  Blue = 1, Yellow = 2
}

export default PlayerColor

export const playerColors = Object.values(PlayerColor).filter(isPlayerColor)

function isPlayerColor(arg: string | PlayerColor): arg is PlayerColor {
  return typeof arg === 'number'
}