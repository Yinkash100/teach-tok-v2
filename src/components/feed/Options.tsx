import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import ThumbsDownIcon from "../../../assets/thumbs-down.png";
import ThumbsUpIcon from "../../../assets/thumbs-up.png";

const { width: REVEALED_WIDTH } = Dimensions.get("window");
const UNREVEALED_WIDTH = 0;

export interface OptionsProps {
  option: { id: string; answer: string };
  correctAnswer: string | null;
  selectedAnswer: string | null;
  onPressAnswer: (id: string) => void;
}

export const Options: React.FC<OptionsProps> = ({
  option,
  correctAnswer,
  selectedAnswer,
  onPressAnswer,
}) => {
  const position = useSharedValue(0);
  useEffect(() => {
    if (selectedAnswer) {
      position.value = withTiming(1);
    }
  }, [selectedAnswer, position]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: interpolate(
        position.value,
        [0, 1],
        [REVEALED_WIDTH, UNREVEALED_WIDTH],
      ),
    };
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPressAnswer(option.id)}
        disabled={!!selectedAnswer}
      >
        <View style={[styles.button]}>
          {selectedAnswer === option.id && option.id !== correctAnswer && (
            <Animated.View
              style={[
                styles.selected_answer,
                styles.incorrect_answer,
                animatedStyles,
              ]}
            />
          )}
          {selectedAnswer && option.id === correctAnswer && (
            <Animated.View
              style={[
                styles.selected_answer,
                styles.correct_answer,
                animatedStyles,
              ]}
            />
          )}
          <Text style={styles.answer_text}>{option.answer}</Text>

          {selectedAnswer === option.id && option.id === correctAnswer && (
            <Image source={ThumbsUpIcon} style={styles.thumb} />
          )}
          {selectedAnswer === option.id && option.id !== correctAnswer && (
            <Image source={ThumbsDownIcon} style={styles.thumb} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selected_answer: {
    position: "absolute",
    borderRadius: 8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  correct_answer: {
    backgroundColor: "#28B18FB3",
  },
  incorrect_answer: {
    backgroundColor: "#DC5F5F",
  },
  container: {
    position: "relative",
    marginBottom: 8,
  },
  button: {
    height: 52,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF80",
  },
  answer_text: {
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 20,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  thumb: {
    position: "absolute",
    right: 12,
    top: 16,
  },
});
