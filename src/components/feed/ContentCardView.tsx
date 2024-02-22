import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

import { Question } from "./Question";
import RightSideBar from "./RightSideBar";
import style from "./style";
import PlaylistIcon from "../../../assets/playlist.png";

import { useAppColorProfile } from "@/hooks/colorHooks";

interface ContentCardProps {
  content: any;
}

interface ContentCardViewProps {
  content: any;
  index: number;
}

interface WrapperContentViewProps {
  url: undefined | string;
  children: JSX.Element;
}

export const ContentCardView: React.FC<ContentCardViewProps> = ({
  content,
}) => {
  if (content.content === null || content.loading === "loading") {
    return (
      <View style={style.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return <ContentCard content={content.content} />;
};

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const colorPallet = useAppColorProfile();
  const colorSyle = useMemo(
    () =>
      StyleSheet.create({
        playListBackground: { backgroundColor: "#161616" },
        text: {
          color: colorPallet.text_color,
          fontSize: 13,
        },
        headText: {
          color: colorPallet.text_color,
          fontWeight: "500",
          fontSize: 15,
        },
        playlistText: {
          color: colorPallet.text_color,
          fontWeight: "500",
          fontSize: 13,
        },
      }),
    [colorPallet],
  );

  return (
    <WrapperContent url={content.image}>
      <View style={style.container}>
        <View style={style.contentWrapper}>
          <View style={style.content}>
            <View style={style.content}>
              <Question question={content} />
            </View>
            <View style={style.bottomFooter}>
              <Text style={colorSyle.headText}>{content.user?.name}</Text>
              <Text style={colorSyle.text}>{content.description}</Text>
            </View>
          </View>
          <RightSideBar userImageURI={content.user.avatar} />
        </View>

        <View style={[style.playlist, colorSyle.playListBackground]}>
          <View style={style.playlistIcon}>
            <Image source={PlaylistIcon} />
          </View>
          <Text style={colorSyle.playlistText}>{content.playlist}</Text>
        </View>
      </View>
    </WrapperContent>
  );
};

const WrapperContent: React.FC<WrapperContentViewProps> = ({
  url,
  children,
}) => {
  const colorPallet = useAppColorProfile();
  const overlayStyle = useMemo(
    () =>
      StyleSheet.create({
        overlayBackground: { backgroundColor: colorPallet.background_color },
      }),
    [colorPallet],
  );
  if (url === undefined) {
    return (
      <LinearGradient
        colors={["darkblue", "black"]}
        style={style.wrapperContainer}
      >
        {children}
      </LinearGradient>
    );
  }
  return (
    <ImageBackground style={style.wrapperContainer} source={{ uri: url }}>
      <View style={[style.overlay, overlayStyle.overlayBackground]} />
      <View style={style.content}>{children}</View>
    </ImageBackground>
  );
};
