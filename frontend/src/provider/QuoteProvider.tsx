import React, { createContext, PropsWithChildren, useState } from "react";
import { QuotesContextInterface } from "../model/QuoteContextInterface";
import { QuoteRequestInterface } from "../model/QuoteRequestInterface";

const initQuotesStr = sessionStorage.getItem("quotes") || "";
const initQuotes = initQuotesStr ? JSON.parse(initQuotesStr) : [];

const defaultState: QuotesContextInterface = {
  quotes: initQuotes,
  isLoading: false,
  errorMessage: "",
  saveQuote: (data: QuoteRequestInterface) => Promise.resolve(undefined),
};

const QuotesContext = createContext<QuotesContextInterface>(defaultState);

interface ProviderProps {
  children: any;
}

const QuotesProvider: React.FC<PropsWithChildren<ProviderProps>> = ({
  children,
}) => {
  const [quotes, setQuotes] = useState(initQuotes);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const saveQuote = async (
    data: QuoteRequestInterface
  ): Promise<void | undefined> => {
    setIsLoading(true);
    await fetch("/api/payment/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API error!");
        }
      })
      .then((respData) => {
        const newQuotes = quotes.concat({ ...data, ...respData });
        sessionStorage.setItem("quotes", JSON.stringify(newQuotes));
        setQuotes(newQuotes);
        setIsLoading(false);
        setErrorMessage("");
      })
      .catch((e) => {
        setErrorMessage(e.message ? e.message : e);
        setIsLoading(false);
      });
  };

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        saveQuote,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
};

export default QuotesProvider;

export { QuotesContext };
