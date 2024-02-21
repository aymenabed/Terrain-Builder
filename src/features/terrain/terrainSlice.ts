import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TileType } from "../../types";
import { COSTS } from "../../utlis/constants";

type PlaceItemPayload = {
  x: number;
  y: number;
  type: TileType;
};

interface TerrainState {
  grid: TileType[][];
  budget: number;
  selectedBlockType: TileType | null;
  selectedTile: {
    type: TileType | null;
    position: { x: number; y: number } | null;
  } | null;
  history: {
    grid: TileType[][];
    budget: number;
    log: string;
  }[];
  currentActionIndex: number;
}

const initialState: TerrainState = {
  grid: Array(10).fill(Array(10).fill(TileType.GRASS)),
  budget: 100,
  selectedBlockType: null,
  selectedTile: null,
  history: [],
  currentActionIndex: -1,
};

const cloneGrid = (grid: TileType[][]) => grid.map((row) => [...row]);

const terrainSlice = createSlice({
  name: "terrain",
  initialState,
  reducers: {
    setSelectedBlockType: (state, action: PayloadAction<TileType | null>) => {
      state.selectedBlockType = action.payload;
    },
    placeItem: (state, action: PayloadAction<PlaceItemPayload>) => {
      const { x, y, type } = action.payload;
      if (state.selectedBlockType && state.grid[x][y] === TileType.GRASS) {
        const costKey =
          `PLACE_${state.selectedBlockType.toUpperCase()}` as keyof typeof COSTS;
        if (state.budget >= COSTS[costKey]) {
          state.grid[x][y] = state.selectedBlockType;
          state.budget -= COSTS[costKey];
          // Update history
          state.history = state.history.slice(0, state.currentActionIndex + 1);
          state.history.push({
            grid: cloneGrid(state.grid),
            budget: state.budget,
            log: `Placed ${type} at (${x}, ${y})`,
          });
          state.currentActionIndex++;
        }
      }
    },
    removeItem: (state, action: PayloadAction<PlaceItemPayload>) => {
      const { x, y, type } = action.payload;
      const tileType = state.grid[x][y];
      if (tileType !== TileType.GRASS && tileType !== TileType.WATER) {
        const costKey =
          `REMOVE_${tileType.toUpperCase()}` as keyof typeof COSTS;
        state.budget += COSTS[costKey];
        state.grid[x][y] = TileType.GRASS;
        // Update history
        state.history = state.history.slice(0, state.currentActionIndex + 1);
        state.history.push({
          grid: cloneGrid(state.grid),
          budget: state.budget,
          log: `Removed ${type} at (${x}, ${y})`,
        });
        state.currentActionIndex++;
      }
    },
    undoAction: (state) => {
      if (state.currentActionIndex > 0) {
        state.currentActionIndex--;
        const previousState = state.history[state.currentActionIndex];
        state.grid = cloneGrid(previousState.grid);
        state.budget = previousState.budget;
      }
    },
    redoAction: (state) => {
      if (state.currentActionIndex < state.history.length - 1) {
        state.currentActionIndex++;
        const nextState = state.history[state.currentActionIndex];
        state.grid = cloneGrid(nextState.grid);
        state.budget = nextState.budget;
      }
    },
    revertToAction: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index <= state.currentActionIndex) {
        const { grid, budget } = state.history[index];
        state.grid = cloneGrid(grid);
        state.budget = budget;
        state.currentActionIndex = index;
      }
    },

    setSelectedTile: (
      state,
      action: PayloadAction<{
        type: TileType | null;
        position: { x: number; y: number } | null;
      }>
    ) => {
      const { type, position } = action.payload;
      state.selectedTile = { type, position };
    },
  },
});

export const {
  setSelectedBlockType,
  placeItem,
  removeItem,
  undoAction,
  redoAction,
  revertToAction,
  setSelectedTile,
} = terrainSlice.actions;

export const selectGrid = (state: RootState) => state.terrain.grid;
export const selectBudget = (state: RootState) => state.terrain.budget;
export const selectSelectedBlockType = (state: RootState) =>
  state.terrain.selectedBlockType;
export const selectCurrentActionIndex = (state: RootState) =>
  state.terrain.currentActionIndex;
export const selectHistory = (state: RootState) => state.terrain.history;
export const SelectedTile = (state: RootState) => state.terrain.selectedTile;

export default terrainSlice.reducer;
