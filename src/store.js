import { configureStore, createSlice } from '@reduxjs/toolkit';

// Lógica de tareas.
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    // Agregar tarea.
    addTask: (state, action) => {
      state.push(action.payload);
    },
    // Eliminar tarea.
    deleteTask: (state, action) => {
      return state.filter((task, index) => index !== action.payload);
    }
  }
});

export const { addTask, deleteTask } = tasksSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
}); 