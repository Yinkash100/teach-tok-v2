import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");
const fullscreenHeight = height - (Platform.OS === "ios" ? 69 : 50);
const style = StyleSheet.create({
  container: {
    marginTop: 2,
    height: fullscreenHeight,
  },
  contentWrapper: { flexDirection: "row", flex: 1 },
  content: {
    flex: 1,
  },
  bottomFooter: { padding: 10 },
  playlist: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperContainer: {
    height: fullscreenHeight,
    width,
  },
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.3,
  },
  playlistIcon: { paddingRight: 5 },
});

export default style;
