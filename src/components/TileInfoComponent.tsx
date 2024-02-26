import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { SelectedTile, removeItem } from "../features/terrain/terrainSlice";

const TileInfoComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTile = useAppSelector(SelectedTile);

  const handleRemove = () => {
    if (selectedTile && selectedTile.position && selectedTile.type) {
      dispatch(
        removeItem({
          x: selectedTile.position.x,
          y: selectedTile.position.y,
          type: selectedTile.type,
        })
      );
    }
  };

  // S'assure que selectedTile et selectedTile.position ne sont pas null avant de procéder
  if (!selectedTile || !selectedTile.position) {
    return <div className="p-4">No tile selected</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center justify-center">
      <h3 className="font-bold text-lg">
        Information about the selected tile :
      </h3>
      <p>Type : {selectedTile.type}</p>
      <p>
        Position : ( {selectedTile.position.x}, {selectedTile.position.y} )
      </p>
      {selectedTile.type !== "grass" && selectedTile.type !== "water" && (
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={handleRemove}
        >
          Remove block ({" "}
          {selectedTile.type === "house" ? "+5 Credit" : "+3 Credit"} )
        </button>
      )}
    </div>
  );
};

export default TileInfoComponent;
