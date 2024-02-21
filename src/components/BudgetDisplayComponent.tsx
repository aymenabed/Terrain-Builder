import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectBudget } from "../features/terrain/terrainSlice";
import { toast } from "react-toastify";

const BudgetDisplayComponent: React.FC = () => {
  const budget = useAppSelector(selectBudget);

  React.useEffect(() => {
    if (budget < 3) {
      toast.error("Your budget is exhausted !");
    }
  }, [budget]);

  return (
    <div className="flex justify-center items-center m-4">
      <div className="bg-green-200 p-4 rounded-lg shadow-md flex items-center">
        <h2 className="text-lg font-semibold mr-4">Current budget :</h2>
        <p className="text-xl font-bold mx-auto">{budget} credits</p>
      </div>
    </div>
  );
};

export default BudgetDisplayComponent;
