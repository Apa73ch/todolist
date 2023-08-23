import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const Line = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height={10}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EDEFF4"
      strokeLinecap="round"
      strokeWidth={4}
      d="M5 5h801"
    />
  </Svg>
)

