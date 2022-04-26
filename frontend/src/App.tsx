import { Routes, Route } from "react-router-dom";
import QuotesProvider from "./provider/QuoteProvider";
import "./App.css";
import LoanCalculatePage from "./pages/LoanCaluclatePage";
import QuotesResultPage from "./pages/QuotesResultPage";
import ThankYouPage from "./pages/ThankYouPage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <QuotesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoanCalculatePage />} />
          <Route path="/results" element={<QuotesResultPage />} />
          <Route path="/thanks" element={<ThankYouPage />} />
        </Routes>
      </QuotesProvider>
    </div>
  );
}

export default App;
