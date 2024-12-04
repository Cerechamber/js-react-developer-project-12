import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Navbar, Button } from "react-bootstrap";
const Layout = ({ dispatch, setUser, navigate }) => {
  const { token } = useSelector((state) => state.authReducer);
  const getOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    dispatch(setUser({}));
    navigate("/login", { replace: true });
  };
  return (
    <div
      className="d-flex flex-column justify-content-between h-100 chat bg-dark bg-gradient"
      data-bs-theme="dark"
    >
      <header className="header">
        <Navbar className="bg-body-tertiary shadow">
          <Container>
            <Link
              to="/"
              className="text-info-emphasis fs-4 fw-semibold text-decoration-none pt-2 pb-2"
            >
              Slack Chat
            </Link>

            {token ? (
              <Button variant="outline-info" onClick={() => getOut()}>
                Выйти
              </Button>
            ) : null}
          </Container>
        </Navbar>
      </header>

      <Outlet />

      <footer className="footer">
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand
              href="mailto:cerechamber@mail.ru"
              className="fs-6 text-body-tertiary"
            >
              cerechamber@mail.ru
            </Navbar.Brand>
          </Container>
        </Navbar>
      </footer>
    </div>
  );
};

export default Layout;
