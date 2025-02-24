import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getAuth } from "../contexts/AuthProvider";
import { Container, Navbar, Button, Image } from "react-bootstrap";
import en from "../assets/en.png";
import ru from "../assets/ru.png";

const Layout = () => {
  const { authOut } = getAuth();
  const { t, i18n } = useTranslation();
  const { token } = useSelector((state) => state.usersReducer);
  
  const handleLangSwitch = (e) => {
    const lang = e.target.dataset.lang;
    lang === 'ru' ? i18n.changeLanguage('en') : i18n.changeLanguage('ru');
  }

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

            <div>
            {token ? (
              <Button variant="outline-info" onClick={() => authOut()}>
                { t('getOut') }
              </Button>
            ) : null}

            <Image
            data-lang={ i18n.language }
            onClick={handleLangSwitch}
            src={ i18n.language === 'ru' ? en : ru }
            alt=" "
            className="lang"
             />
            </div>
          </Container>
        </Navbar>

      <Outlet />
    </div>
  );
};

export default Layout;
