import { Link } from "react-router-dom";

interface headerProps {
  branding: string;
}
const Header = (props: headerProps) => {
  const { branding } = props;
  return (
    <nav
      data-test="HeaderComponent"
      className="navbar navbar-expand-sm navbar-dark bg-danger mb-5 py-0"
    >
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link">
                <i className="fas fa-plus" /> Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question" /> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
