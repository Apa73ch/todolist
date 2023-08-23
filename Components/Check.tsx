import React, { useState } from "react";
import Svg, { SvgProps, G, Circle, Path, Defs } from "react-native-svg";

interface CheckProps {
  isChecked: boolean;
  onPress: () => void;
  style?: any; // Puedes ajustar el tipo según tus necesidades
}

export const Check = ({ isChecked, onPress, style }: CheckProps) => {


  const toggleCheck = () => {
    onPress();
  };



  if (isChecked) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={100}
            height={100}
            fill="none"
            onPress={toggleCheck}
            style={style}
        >
            <G filter="url(#a)" transform={`translate(0, ${28})`}>
            <Circle cx={25.5} cy={21.5} r={20} fill="#BFD804" />
            <Path
            stroke="#EDEFF4"
            strokeLinecap="round"
            strokeWidth={5}
            d="M2.5-2.5h5.477"
            transform="matrix(.69786 .71623 -.69786 .71623 15 23.07)"
            />
            <Path
            fill="#EDEFF4"
            d="M37.177 18.768a2.5 2.5 0 0 0-3.535-3.536l3.535 3.536ZM23.844 32.101l13.333-13.333-3.535-3.536-13.333 13.333 3.535 3.536Z"
            />
            <Defs></Defs>
            </G>
      </Svg>
    );
  } else {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} fill="none" onPress={toggleCheck} style={style}>
        <G filter="url(#a)">
          <Circle cx={25} cy={50} r={18} fill="none" stroke="#BFD804" strokeWidth={4} />
        </G>
      </Svg>
    );
  }
};
