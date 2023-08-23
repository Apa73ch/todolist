import * as React from "react"
import Svg, { SvgProps, G, Circle, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const AddButton = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={80}
    viewBox="30 30 185 185"
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Circle cx={133} cy={123} r={79} fill="#fff" />
    </G>
    <G stroke="#25499A" strokeLinecap="round" strokeWidth={13} filter="url(#b)">
      <Path d="M133.446 106.486v33.028M116.486 123.186h33.028" />
    </G>
    <Defs></Defs>
  </Svg>
)

