import { QuoteDataInterface } from "./QuoteDataInterface";
import { QuoteRequestInterface } from "./QuoteRequestInterface";

export interface QuotesContextInterface {
  quotes: QuoteDataInterface[] | undefined;
  saveQuote: (data: QuoteRequestInterface) => Promise<void | undefined>;
}
