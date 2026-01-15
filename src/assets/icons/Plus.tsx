import Svg, { Path } from "react-native-svg";

export const Plus = ({ size = 24, color = "#000" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4.5V19.5"
        stroke={color}
        stroke-width="16.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth={2}
      />
      <Path
        d="M19.5 12H4.5"
        stroke={color}
        stroke-width="16.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
};
