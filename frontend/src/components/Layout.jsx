import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Navbar, Button } from "react-bootstrap";
const Layout = ({ dispatch, setUser, navigate }) => {
  const { token } = useSelector((state) => state.usersReducer);
  const getOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    dispatch(setUser({}));
    navigate("/login", { replace: true });
  };
  return (
    <div
      className="d-flex flex-column h-100 chat bg-dark bg-gradient"
      data-bs-theme="dark"
    >
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

      <Outlet />
    </div>
  );
};

export default Layout;
