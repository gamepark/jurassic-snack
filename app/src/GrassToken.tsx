/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
// import air_raid from "./images/grass/air_raid_token.png"
// import air_travel from "./images/grass/air_travel_token.png"
import back_token from "./images/grass/back_token.jpg"
// import birth from "./images/grass/birth_token.png"
// import recon from "./images/grass/recon_token.png"
// import surprise from "./images/grass/surprise_token.png"
// import volcanic_eruption from "./images/grass/volcanic_eruption_token.png"
// import yummy from "./images/grass/yummy_token.png"
//import Grass from "@gamepark/jurassic-snack/Grass";
import {HTMLAttributes} from "react";
import Coordinates from "@gamepark/jurassic-snack/Coordinates";

type Props = {
    grass: Coordinates
} & HTMLAttributes<HTMLDivElement>

export default function GrassToken({...props}: Props) {

    return <div css={[grassCss, grassBackground()]} {...props}>

    </div>

}

//const grassImages = [back_token, birth, recon, air_travel, air_raid, volcanic_eruption, surprise, yummy]

const grassBackground = () => css`
  
  background-image: url(${back_token});
`;

const grassCss = css`
  background-size: cover;
`;