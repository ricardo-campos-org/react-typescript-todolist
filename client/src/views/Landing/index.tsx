import React, { useCallback, useContext, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './styles.scss';
import { useTranslation } from 'react-i18next';

/**
 * Landing page component.
 *
 * This component displays the landing page of the application,
 * providing navigation to login or register.
 * It also checks for an existing user session.
 *
 * @returns {JSX.Element} The Landing page component.
 */
function Landing(): JSX.Element {
  const { signed, checkCurrentAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  /**
   * Navigates to the specified page.
   *
   * @param {string} page - The page to navigate to.
   */
  const goTo = useCallback((page: string): void => {
    navigate(page);
  }, []);

  /**
   * Handles the login button click event.
   *
   * If a user is already signed in, it navigates to the home page.
   * Otherwise, it navigates to the login page.
   */
  const handleLogin = (): void => {
    if (signed) {
      goTo('/home');
    } else {
      goTo('/login');
    }
  };

  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    checkCurrentAuthUser(window.location.pathname);
  }, []);

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center landing-page">
      <div>
        <h1 className="display-4">
          {t("landing_title")}
        </h1>
        <p className="lead">
          {t("landing_subtitle")}
        </p>

        <Button
          type="button"
          variant="primary"
          className="btn-lg me-3"
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          variant="outline-primary"
          className="btn-lg"
          type="button"
          onClick={() => goTo('/register')}
        >
          Register
        </Button>

        <br />

        <div className="my-3">
          <Button
            type="button"
            variant="outline-primary"
            className="btn-sm me-3"
            onClick={() => handleLanguage('en')}
          >
            EN English
          </Button>

          <Button
            type="button"
            variant="outline-primary"
            className="btn-sm me-3"
            onClick={() => handleLanguage('pt_br')}
          >
            PT-BR Português
          </Button>

          <Button
            type="button"
            variant="outline-primary"
            className="btn-sm me-3"
            onClick={() => handleLanguage('es')}
          >
            ES Español
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Landing;
