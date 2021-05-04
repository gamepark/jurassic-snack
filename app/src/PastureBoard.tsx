/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import pasture0 from "./images/pasture-0.png"
import pasture1 from "./images/pasture-1.png"
import pasture2 from "./images/pasture-2.png"
import pasture3 from "./images/pasture-3.png"
import Pasture from "@gamepark/jurassic-snack/Pasture";
import Direction from "@gamepark/jurassic-snack/Direction";
import {HTMLAttributes} from "react";

type Props = {
    pasture: Pasture
} & HTMLAttributes<HTMLDivElement>

export default function PastureBoard({pasture: {direction, id}, ...props}: Props) {

    return <div css={[pastureCss, pastureBackground(id), pastureRotate(direction)]} {...props}>

    </div>

}

const pastureImages = [pasture0, pasture1, pasture2, pasture3]

const pastureBackground = (id: number) => css`
  background-image: url(${pastureImages[id]});
`;

const pastureRotate = (direction: Direction) => css`
  transform: rotate(${direction * 90}deg);
`;

const pastureCss = css`
  background-size: cover;
`;