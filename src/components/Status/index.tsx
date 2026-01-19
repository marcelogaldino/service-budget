import { FC } from "react";
import { Text, View } from "react-native";
import { STATUS, StatusTypes } from "./strategies/status-stategy";

interface StatusProps {
  statusType: StatusTypes;
}

export const Status: FC<StatusProps> = ({ statusType }) => {
  const statusData = STATUS[statusType];

  return (
    <View
      className={`flex-row justify-center items-center w-[83px] px-1 py-2 rounded-md ${statusData.bgColor}`}
    >
      <View
        className={`w-[8px] h-[8px] mr-[6px] rounded-full ${statusData.pointColor}`}
      />
      <Text className={`${statusData.textColor} text-xs font-bold leading-4`}>
        {statusData.name}
      </Text>
    </View>
  );
};
