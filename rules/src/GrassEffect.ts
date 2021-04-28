enum GrassEffect {
  Birth = 1, Recon, AirTravel, AirRaid, VolcanicEruption, Surprise, Yummy
}

export default GrassEffect

export const grassEffects = Object.values(GrassEffect).filter(isGrassEffect)

function isGrassEffect(arg: string | GrassEffect): arg is GrassEffect {
  return typeof arg === 'number'
}