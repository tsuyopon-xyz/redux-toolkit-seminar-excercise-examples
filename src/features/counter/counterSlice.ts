import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(incrementAsync.pending, (state) => {
        // pending時に1回呼ばれる
        console.log('Called when incrementAsync.pending');
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        // fulfilledに一回呼ばれる
        console.log('Called when incrementAsync.fulfilled');
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        // rejected時に一回呼ばれる
        console.log('Called when incrementAsync.rejected');
      });
  },
});

export const incrementAsync = createAsyncThunk(
  `${counterSlice.name}/asyncIncrement`,
  async () => {
    await wait(1000);
    return 1;
  }
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

const wait = (ms = 0) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
