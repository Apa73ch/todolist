import * as React from "react"
import Svg, { SvgProps, G, Rect, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const NoTask = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={340}
    height={50}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width='100%'
        height='98%'
        x={0.5}
        y={0.5}
        stroke="#213976"
        strokeDasharray="10 10"
        strokeWidth={5.5}
        rx={18}
      />
    </G>
    <Defs></Defs>
  </Svg>
)

