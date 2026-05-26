import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000';
const API_KEY = 'ToDo2026';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': API_KEY
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const response = await fetch(`${API_URL}/getGoals`, { headers });
  return response.json();
});

export const addGoalThunk = createAsyncThunk('goals/addGoalThunk', async (newGoal) => {
  const response = await fetch(`${API_URL}/addGoal`, {
    method: 'POST',
    headers,
    body: JSON.stringify(newGoal)
  });
  const data = await response.json();
  return data.meta;
});

export const removeGoalThunk = createAsyncThunk('goals/removeGoalThunk', async (id) => {
  await fetch(`${API_URL}/removeGoal`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({ id })
  });
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task, index) => index !== action.payload);
    }
  }
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addGoalThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeGoalThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  }
});

export const { addTask, deleteTask } = tasksSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    goals: goalsSlice.reducer
  }
});