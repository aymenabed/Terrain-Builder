import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  undoAction,
  redoAction,
  selectHistory,
  selectCurrentActionIndex,
  revertToAction,
} from "../features/terrain/terrainSlice";
import "../utlis/style.css";

const HistoryComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const currentActionIndex = useAppSelector(selectCurrentActionIndex);

  const handleUndo = () => dispatch(undoAction());
  const handleRedo = () => dispatch(redoAction());
  const handleRevert = (index: number) => dispatch(revertToAction(index));

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold">Stock History :</h3>
      {history.length > 0 && (
        <div className="flex justify-center my-4">
          <button
            className={`mx-2 bg-blue-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${
              currentActionIndex <= 0
                ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                : ""
            }`}
            onClick={handleUndo}
            disabled={currentActionIndex <= 0}
          >
            Previous
          </button>
          <button
            className={`mx-2 bg-blue-500 hover:opacity-75 text-white font-bold py-2 px-4 rounded ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 ${
              currentActionIndex >= history.length - 1
                ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                : ""
            }`}
            onClick={handleRedo}
            disabled={currentActionIndex >= history.length - 1}
          >
            Next
          </button>
        </div>
      )}
      <div className="overflow-y-auto max-h-40">
        <ul className="list-disc">
          {history.map((entry, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                index === currentActionIndex ? "text-red-500" : "text-blue-500"
              }`}
              onClick={() => handleRevert(index)}
            >
              Action {index + 1} : {entry?.log} | budget : {entry?.budget}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryComponent;
