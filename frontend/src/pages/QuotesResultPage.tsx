import { useContext } from "react";
import { QuotesContext } from "../provider/QuoteProvider";

const QuotesResultPage: React.FC = () => {
  const { quotes } = useContext(QuotesContext);

  return (
    <div className="quote-results">
      <h2>Quote Results</h2>
      <table className="result-table">
        <thead>
          <tr className="result-row">
            <th>Term</th>
            <th>Loan Amount</th>
            <th>Interest Rate</th>
            <th>Residual Value</th>
            <th>Payment Amount</th>
          </tr>
        </thead>
        {quotes?.map((quote, index) => {
          return (
            <tbody key={index}>
              <tr className="result-row">
                <td>{quote.term}</td>
                <td>{quote.loanAmount}</td>
                <td>{quote.interestRate}</td>
                <td>{quote.residualValue}</td>

                <td>{quote.paymentAmount}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default QuotesResultPage;
