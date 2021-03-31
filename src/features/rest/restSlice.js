import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as debug from 'debug';

const logger = debug('lsamp:restSlice');

export async function handleAjax(resp) {
  logger("Handle ajax resp: %o", resp);
  const js = await resp.json();
  logger("Ajax response json: %o", js);
  const {ok, status} = resp;
  return {
    ok, status,
    body: js,
  };
}

export function wait(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

export const startGetFoo = createAsyncThunk(
  'rest/GetFoo',
  async (input, {rejectWithValue, getState, dispatch}) => {
    logger('[GetFoo] begin');

    return fetch(`https://jsonplaceholder.typicode.com/posts/${input}`)
      .then(handleAjax);
  }
);

export const slice = createSlice({
  name: 'rest',
  initialState: {
    value: 'EMPTY',
  },
  reducers: {
    doClear: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = "EMPTY";
    },
  },
  extraReducers: {
    [startGetFoo.pending]: (state, action) => {
      logger("startGetFoo.pending: %o, %o", state, action);
    },
    [startGetFoo.fulfilled]: (state, action) => {
      logger("startGetFoo.fulfilled: %o, %o", state, action);
      state.value = action.payload;
      state.valueLoading = false;
    },
    [startGetFoo.rejected]: (state, action) => {
      logger("startGetFoo.rejected: %o, %o", state, action);
    },
  }
});

export const {doClear} = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const startSomethingAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(doClear());
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSomething = state => state.rest.value;
export const selectRestValue = state => state.rest.value;

export default slice.reducer;
