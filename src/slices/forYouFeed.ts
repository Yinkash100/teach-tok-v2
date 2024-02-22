import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getForYou } from "@/services/getForYou";
import { RootState } from "@/store";

export interface ContentState {
  displayIndex: number;
  feed: any[];
}

export const getNextForYou = createAsyncThunk<
  any,
  undefined,
  { state: RootState }
>("feed/getNextForYou", async (_, { requestId }) => {
  const response = await getForYou();
  const content: unknown = response?.data;
  if (content) {
    return { content, requestId, loading: "success" };
  }
  return { content: null, requestId, loading: "error" };
});

const initialState: ContentState = {
  displayIndex: 0,
  feed: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNextForYou.pending, (state, action) => {
      const currentItem = state.feed.filter(
        (item) => item.requestId === action.meta.requestId,
      );
      if (!currentItem.length) {
        const newItem: any = {
          loading: "loading",
          requestId: action.meta.requestId,
          content: null,
        };
        state.feed.push(newItem);
      }
    });
    builder.addCase(getNextForYou.rejected, (state, action) => {
      const foundIndex = state.feed.findIndex(
        (item) => item.requestId === action.meta.requestId,
      );
      if (foundIndex >= 0) {
        state.feed[foundIndex].loading = "error";
      }
    });
    builder.addCase(getNextForYou.fulfilled, (state, action) => {
      const foundIndex = state.feed.findIndex(
        (item) => item.requestId === action.meta.requestId,
      );
      if (foundIndex >= 0) {
        state.feed[foundIndex] = action.payload;
      }
    });
  },
});

export default contentSlice.reducer;
