import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("No tiles selected")).toBeInTheDocument(); // Exemple de vérification
  });

  it("renders all main components", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Current budget :")).toBeInTheDocument();
  });
});
