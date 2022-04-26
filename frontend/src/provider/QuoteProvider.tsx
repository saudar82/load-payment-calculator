import React, { createContext, PropsWithChildren, useState } from "react";
import { QuotesContextInterface } from "../model/QuoteContextInterface";
import { QuoteRequestInterface } from "../model/QuoteRequestInterface";

const initQuotesStr = sessionStorage.getItem("quotes") || "";
const initQuotes = initQuotesStr ? JSON.parse(initQuotesStr) : [];

const defaultState: QuotesContextInterface = {
  quotes: initQuotes,
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

  const saveQuote = async (
    data: QuoteRequestInterface
  ): Promise<void | undefined> => {
    await fetch("/api/payment/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((respData) => {
        const newQuotes = quotes.concat({ ...data, ...respData });
        sessionStorage.setItem("quotes", JSON.stringify(newQuotes));
        setQuotes(newQuotes);
      })
      .catch(() => {});
  };

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        saveQuote,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
};

export default QuotesProvider;

export { QuotesContext };
