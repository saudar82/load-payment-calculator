import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders app with header text", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const headerLink = screen.getByText(/Loan Quote Calculator/i);
  expect(headerLink).toBeInTheDocument();
});
