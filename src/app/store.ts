import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import terrainReducer from "../features/terrain/terrainSlice";

// Combine les reducers en un seul rootReducer
const rootReducer = combineReducers({
  terrain: terrainReducer,
});

// Configuration du store Redux
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
