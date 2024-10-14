import React, {
  useCallback, useContext, useEffect, useState
} from 'react';
import {
  Alert, Button, Card, Col, Container, Form, Row
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';
import './styles.scss';
import { translateMessage } from '../../utils/TranslatorUtils';

/**
 * Login page component.
 *
 * This component displays the login page of the application,
 * providing navigation to register or back to home.
 *
 * @returns {JSX.Element} The Login page component.
 */
function Login(): JSX.Element {
  const { signIn } = useContext(AuthContext);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [validated, setValidated] = useState<boolean>(true);
  const [formInvalid, setFormInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  /**
   * Navigates to the specified page.
   *
   * @param {string} page - The page to navigate to.
   */
  const goTo = useCallback((page: string): void => {
    navigate(page);
  }, []);

  /**
   * Handles the form submit button click event.
   *
   * When clicked, checks if the form is valid. It it's not, raise an error
   * message in an Alert. Otherwise, it call the signIn API and navigates to the home page.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setFormInvalid(true);
      setErrorMessage(translateMessage('Please fill in your username and password!', i18n.language));
      return;
    }

    setFormInvalid(false);
    try {
      await signIn(form.email.value, form.password.value);
      goTo('/home');
    } catch (e) {
      setFormInvalid(true);
      if (typeof e === 'string') {
        setErrorMessage(translateMessage(e, i18n.language));
      } else if (e instanceof Error) {
        setErrorMessage(translateMessage(e.message, i18n.language));
      }
    }
  };

  useEffect(() => {}, [formInvalid]);

  return (
    <Container fluid className="login-page">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="text-center">{t('login_title')}</h2>

              {formInvalid ? (
                <Alert variant="danger">
                  { errorMessage }
                </Alert>
              ) : null}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('login_email_label')}</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder={t('login_email_placeholder')}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t('login_password_label')}</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder={t('login_password_placeholder')}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  {t('login_btn_submit')}
                </Button>
              </Form>

              <div className="text-center mt-3">
                {`${t('login_no_account')} `}
                <Link to="/register" className="text-decoration-none">
                  {t('login_register_here')}
                </Link>
              </div>

              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  {t('login_back_home')}
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
