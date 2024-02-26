import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setSelectedBlockType,
  selectSelectedBlockType,
} from "../features/terrain/terrainSlice";
import { TileType } from "../types";

const SelectionBarComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedBlockType = useAppSelector(selectSelectedBlockType);

  const blockTypes = [
    { type: TileType.GRASS, label: "Grass", color: "bg-green-500" },
    { type: TileType.HOUSE, label: "House", color: "bg-blue-500" },
    { type: TileType.ROCK, label: "Rock", color: "bg-gray-500" },
    { type: TileType.WATER, label: "Water", color: "bg-blue-300" },
  ];

  const handleBlockSelection = (type: TileType) => {
    dispatch(setSelectedBlockType(type));
  };

  return (
    <div className="flex justify-center my-4">
      {blockTypes.map((block) => (
        <button
          key={block.type}
          className={`mx-2 ${
            block.color
          } hover:opacity-75 text-white font-bold py-2 px-4 rounded ${
            selectedBlockType === block.type
              ? "ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              : ""
          }`}
          onClick={() => handleBlockSelection(block.type)}
        >
          {block.label}
        </button>
      ))}
    </div>
  );
};

export default SelectionBarComponent;
