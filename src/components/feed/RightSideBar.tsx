import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAppColorProfile } from "@/hooks/colorHooks";

interface RightSideBarProps {
  userImageURI: string;
}

interface ContentIconsButtonProps {
  id: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const icons: ContentIconsButtonProps[] = [
  { id: "like", text: "20", icon: "heart" },
  { id: "comment", text: "20", icon: "chatbubble-ellipses" },
  { id: "bookmark", text: "20", icon: "bookmark" },
  { id: "forward", text: "20", icon: "arrow-redo" },
];

export default function RightSideBar({ userImageURI }: RightSideBarProps) {
  const colorPallet = useAppColorProfile();

  return (
    <View style={styles.rightBarWrapper}>
      <View style={styles.rightIconBar}>
        <View style={styles.iconContent}>
          <View style={styles.wrapper}>
            <Image style={styles.icon} source={{ uri: userImageURI }} />
            <View style={styles.iconWrapper}>
              <Ionicons name="add" size={15} color="white" />
            </View>
          </View>
        </View>
        {icons.map((icon) => (
          <TouchableOpacity onPress={() => {}} key={icon.id}>
            <View style={styles.wrapper}>
              <Ionicons
                name={icon.icon}
                size={30}
                color={colorPallet.text_color}
              />
              <Text style={{ color: colorPallet.text_color }}>{icon.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rightBarWrapper: {
    justifyContent: "flex-end",
    marginRight: 8,
  },
  rightIconBar: { alignContent: "space-around" },
  wrapper: {
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  iconContent: {
    alignItems: "center",
    marginBottom: 15,
  },
  iconwrapper: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  icon: {
    height: 45,
    width: 45,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 20,
  },
  iconWrapper: {
    position: "absolute",
    bottom: -11,
    backgroundColor: "green",
    borderRadius: 15,
    padding: 5,
  },
});
