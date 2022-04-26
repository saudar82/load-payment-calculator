import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QuotesContext } from "../provider/QuoteProvider";
import LoanCalculateForm from "./LoanCalculateForm";

const initState = {
  quotes: [],
  isLoading: false,
  errorMessage: "",
  saveQuote: jest.fn(),
};

const setup = () => {
  return render(
    <Router>
      <QuotesContext.Provider value={initState}>
        <LoanCalculateForm />
      </QuotesContext.Provider>
    </Router>
  );
};

describe("LoanCalculateForm component", () => {
  test("renders without error", () => {
    setup();
    const form = screen.getByTestId("loan-calculate-form");
    expect(form).toBeInTheDocument();
  });

  test("renders approximate quote correctly", async () => {
    setup();
    const defaultApproxQuote = "44444";
    const expectedApproxQuote = "46212";

    const termText = screen.getByLabelText("Term (in months)");
    const approxLabel = screen.getByTestId("approx-label") as HTMLDivElement;
    expect(approxLabel.childNodes[1]?.nodeValue).toBe(defaultApproxQuote);

    await act(() => {
      fireEvent.change(termText, { target: { value: 22 } });
    });

    expect(approxLabel.childNodes[1]?.nodeValue).toBe(expectedApproxQuote);
  });

  test("displays error message when term is left empty", async () => {
    setup();

    const termText = screen.getByLabelText("Term (in months)");
    let termErrorMessage = screen.queryByTestId("term-error-message");

    expect(termErrorMessage).not.toBeInTheDocument();

    await act(() => {
      fireEvent.change(termText, { target: { value: "" } });
      fireEvent.focusOut(termText);
    });

    termErrorMessage = screen.getByTestId(
      "term-error-message"
    ) as HTMLParagraphElement;

    expect(termErrorMessage).toBeInTheDocument();
    expect(termErrorMessage?.childNodes[0].nodeValue).toBe("Required");
  });

  test("saveQuote is invoked when submit button is clicked", async () => {
    setup();
    const submitButton = screen.getByText("Save Quote");
    await act(() => {
      fireEvent.click(submitButton);
    });
    expect(initState.saveQuote).toHaveBeenCalledTimes(1);
  });
});
