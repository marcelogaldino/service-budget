import Svg, { Path } from "react-native-svg";

export const Multiply = ({ size = 24, color = "#000" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 5L5 19"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M19 19L5 5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
};
