// proximity
declare module "react-native-proximity";

// icons
declare module "react-native-vector-icons/Ionicons";
declare module "react-native-vector-icons/MaterialCommunityIcons";
declare module "react-native-vector-icons/Feather";
declare module "react-native-vector-icons/Foundation";

// files
declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}
