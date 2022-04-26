import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuoteRequestInterface } from "../model/QuoteRequestInterface";
import { QuotesContext } from "../provider/QuoteProvider";

const initialValues: QuoteRequestInterface = {
  term: 36,
  loanAmount: 100000,
  interestRate: 10,
  residualValue: 0,
};

const LoanFormSchema = Yup.object().shape({
  term: Yup.number().min(1, "Too less!").required("Required"),
  loanAmount: Yup.number().min(1, "Too less!").required("Required"),
  interestRate: Yup.number()
    .min(0, "Too less!")
    .max(100, "Percentage value cannot exceed 100!")
    .required("Required"),
  residualValue: Yup.number().required("Required"),
});

const LoanCalculateForm: React.FC = () => {
  const { saveQuote, isLoading, errorMessage } = useContext(QuotesContext);
  const [approxQuote, setApproxQuote] = useState<number>(0);
  const [formData, setFormData] =
    useState<QuoteRequestInterface>(initialValues);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (values: QuoteRequestInterface) => {
    saveQuote(values);
    setFormSubmitted(true);
    // if (formData.loanAmount > 1000000) {
    //   navigate("/thanks");
    // } else {
    //   navigate("/results");
    // }
  };

  const calculateQuote = useCallback(() => {
    const approx = Math.round(
      (((formData.loanAmount + formData.residualValue) / 2) *
        ((formData.interestRate / 12) * formData.term) +
        (formData.loanAmount - formData.residualValue)) /
        formData.term
    );
    setApproxQuote(isNaN(approx) ? 0 : approx);
  }, [formData]);

  const handleOnChange = (event: FormEvent) => {
    const element = event.target as HTMLInputElement;
    setFormData({ ...formData, [element.id]: +element.value });
  };

  useEffect(() => {
    calculateQuote();
  }, [formData, calculateQuote]);

  useEffect(() => {
    if (formSubmitted && !isLoading && !errorMessage) {
      if (formData.loanAmount > 1000000) {
        navigate("/thanks");
      } else {
        navigate("/results");
      }
    }
  }, [formSubmitted, isLoading, errorMessage]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={LoanFormSchema}
      >
        <Form onChange={handleOnChange} data-testid="loan-calculate-form">
          <div className="form-field">
            <div className="form-control">
              <label htmlFor="term">Term (in months)</label>
              <Field id="term" type="number" name="term" placeholder="months" />
            </div>
            <ErrorMessage
              name="term"
              component="p"
              data-testid="term-error-message"
            />
          </div>
          <div className="form-field">
            <div className="form-control">
              <label htmlFor="loanAmount">Loan Amount</label>
              <Field
                id="loanAmount"
                type="number"
                name="loanAmount"
                placeholder="$"
              />
            </div>
            <ErrorMessage name="loanAmount" component="p" />
          </div>
          <div className="form-field">
            <div className="form-control">
              <label htmlFor="interestRate">Interest Rate</label>
              <Field
                id="interestRate"
                type="number"
                name="interestRate"
                placeholder="Annual %"
              />
            </div>
            <ErrorMessage name="interestRate" component="p" />
          </div>
          <div className="form-field">
            <div className="form-control">
              <label htmlFor="residualValue">Residual Value</label>
              <Field
                id="residualValue"
                type="number"
                name="residualValue"
                placeholder="$"
              />
            </div>
            <ErrorMessage name="residualValue" component="p" />
          </div>
          <div className="action-bar">
            <div className="approx" data-testid="approx-label">
              Approx. Quote: {approxQuote}
            </div>
            <button type="submit">Save Quote</button>
          </div>
        </Form>
      </Formik>
      <div className="api-status">
        {isLoading && <div>Loading...</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </>
  );
};

export default LoanCalculateForm;
