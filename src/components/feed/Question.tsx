import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Options } from "./Options";

import { getAnswer } from "@/services/getAnswer";

export interface QuestionProps {
  question: any;
}

const MemoizeAnswers = React.memo(Options);
export const Question: React.FC<QuestionProps> = ({ question }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const fetchAnswer = useCallback(async () => {
    const response = await getAnswer(`${question.id}`);
    const ans = response.data.correct_options?.[0]?.id ?? null;
    setAnswer(ans);
  }, [question.id, setAnswer]);

  useEffect(() => {
    fetchAnswer();
  }, [fetchAnswer]);

  const handleOnSelectAnswer = useCallback(
    (id: string) => {
      if (!selected) {
        setSelected(id);
      }
    },
    [setSelected],
  );

  const NO_WIDTH_SPACE = "​";
  const highlight = (str: string) =>
    str.split(" ").map((word: string, i: number) => (
      <Text key={i}>
        <Text style={styles.highlighted}>{word} </Text>
        {NO_WIDTH_SPACE}
      </Text>
    ));

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.front}>{highlight(question.question)}</Text>
        <View style={styles.seperator} />
        {!!question &&
          question.options?.map((option: any) => (
            <MemoizeAnswers
              key={option.id}
              option={option}
              correctAnswer={answer}
              selectedAnswer={selected}
              onPressAnswer={handleOnSelectAnswer}
            />
          ))}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  front: {
    marginTop: 50,
    color: "white",
    fontWeight: "500",
    fontSize: 22,
    lineHeight: 32,
    margin: 10,
    padding: 10,
  },
  seperator: { flex: 1 },
  highlighted: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
});
