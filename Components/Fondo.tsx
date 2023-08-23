import * as React from "react"
import { Dimensions } from 'react-native';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

const windowWidth = Dimensions.get('window').width; // Ancho de la pantalla
const windowHeight = Dimensions.get('window').height; // Alto de la pantalla

export const Fondo = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h1074v1912H0z" />
    <Defs>
      <LinearGradient
        id="a"
        x1={-201.5}
        x2={537}
        y1={1480}
        y2={4511.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#081434" />
        <Stop offset={0.109} stopColor="#0B193B" />
        <Stop offset={1} stopColor="#6796FF" />
      </LinearGradient>
    </Defs>
  </Svg>
)

