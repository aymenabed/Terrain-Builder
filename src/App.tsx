import { Provider } from "react-redux";
import { store } from "./app/store";
import GridComponent from "./components/GridComponent";
import SelectionBarComponent from "./components/SelectionBarComponent";
import TileInfoComponent from "./components/TileInfoComponent";
import HistoryComponent from "./components/HistoryComponent";
import BudgetDisplayComponent from "./components/BudgetDisplayComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <main className="p-12">
          <ToastContainer />
          <SelectionBarComponent />
          <BudgetDisplayComponent />
          <div className="flex justify-center gap-10 mt-5">
            <GridComponent />
            <div className="flex flex-col gap-5">
              <TileInfoComponent />
              <HistoryComponent />
            </div>
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
