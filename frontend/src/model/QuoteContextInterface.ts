import { QuoteDataInterface } from "./QuoteDataInterface";
import { QuoteRequestInterface } from "./QuoteRequestInterface";

export interface QuotesContextInterface {
  quotes: QuoteDataInterface[] | undefined;
  isLoading: boolean;
  errorMessage: string;
  saveQuote: (data: QuoteRequestInterface) => Promise<void | undefined>;
}
