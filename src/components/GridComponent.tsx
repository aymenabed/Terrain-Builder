import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectGrid,
  placeItem,
  setSelectedTile,
  SelectedTile,
  selectSelectedBlockType,
} from "../features/terrain/terrainSlice";
import { TileType } from "../types";

const GridComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectGrid);
  const selectedTile = useAppSelector(SelectedTile);
  const selectedBlockType = useAppSelector(selectSelectedBlockType);

  const handleTileClick = (x: number, y: number, tile: TileType) => {
    if (selectedBlockType) {
      dispatch(placeItem({ x, y, type: selectedBlockType }));
    }
    if (!selectedBlockType || selectedBlockType === "grass") {
      dispatch(setSelectedTile({ type: tile, position: { x, y } }));
    }
  };

  const isSelectedTile = (rowIndex: number, colIndex: number) => {
    return (
      selectedTile &&
      selectedTile.position &&
      selectedTile.position.x === rowIndex &&
      selectedTile.position.y === colIndex
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 50px)",
        gap: "2px",
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleTileClick(rowIndex, colIndex, tile)}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor:
                tile === TileType.GRASS
                  ? "lightgreen"
                  : tile === TileType.HOUSE
                  ? "blue"
                  : tile === TileType.ROCK
                  ? "grey"
                  : "lightblue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: isSelectedTile(rowIndex, colIndex)
                ? "2px solid black"
                : "none",
            }}
          >
            <span style={{ fontSize: "10px" }}>{tile[0]}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default GridComponent;
