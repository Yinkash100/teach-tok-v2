import React, { useCallback } from "react";
import { FlatList, SafeAreaView } from "react-native";

import { ContentCardView } from "@/components/feed/ContentCardView";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getNextForYou } from "@/slices/forYouFeed";

interface RowItemProps {
  item: any;
  index: number;
}
const FeedScreen = () => {
  const dispatch = useAppDispatch();
  const feed = useAppSelector((state) => state.forYou.feed);

  const renderFeedItem = ({ item, index }: RowItemProps) => {
    return <ContentCardView content={item} index={index} />;
  };

  const getNextItem = useCallback(() => {
    dispatch(getNextForYou());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ backgroundColor: "red" }}>
      <FlatList
        data={feed}
        renderItem={renderFeedItem}
        pagingEnabled
        decelerationRate="fast"
        keyExtractor={(item) => item.requestId}
        onEndReached={getNextItem}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
