import "./NavBar.css";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  return (
    <div className="header">
      <div className="app-name">
        <Link to="/">Loan Quote Calculator</Link>
      </div>

      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/results">Saved Quotes</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
