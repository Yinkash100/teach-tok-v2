import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { TAB_FOR_YOU } from "@/navigation/feed/Tabs";
import FeedScreen from "@/screens/feed";
import { getNextForYou } from "@/slices/forYouFeed";

const FeedTab = createBottomTabNavigator();
const { width } = Dimensions.get("window");
export const TABS = [
  { id: TAB_FOR_YOU, name: "For You", components: FeedScreen },
];

const CustomTabButton = (props: any) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [
            props.style,
            {
              borderBottomColor: "white",
              borderBottomWidth: 2,
              justifyItems: "center",
              alignSelf: "center",
            },
          ]
        : props.style
    }
  />
);

const FeedNavigation = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNextForYou());
  }, []);

  const loading = useAppSelector(
    (state) => state.forYou.feed[0]?.loading === "success",
  );
  if (!loading) {
    return <ActivityIndicator />;
  }
  return (
    <FeedTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarLabelStyle: styles.tabBarTextStyle,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
      }}
    >
      {TABS.map((tab) => (
        <FeedTab.Screen
          name={tab.id}
          key={tab.id}
          component={tab.components}
          options={{
            tabBarButton: CustomTabButton,
            title: tab.name,
          }}
        />
      ))}
    </FeedTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    top: 20,
    justifyContent: "center",

    left: width / 2 - 30,
    width: 60,
    backgroundColor: "transparent",
    elevation: 0,
    borderTopWidth: 0,
  },
  tabBarIconStyle: {
    display: "none",
  },
  tabBarTextStyle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
});

export default FeedNavigation;
