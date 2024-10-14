import React, {
  useCallback, useContext, useEffect, useState
} from 'react';
import {
  Alert, Button, Card, Col, Container, Form, Row
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';
import { translateMessage } from '../../utils/TranslatorUtils';

/**
 * Register page component.
 *
 * This component displays the register page of the application,
 * providing navigation to login or back to home.
 *
 * @returns {JSX.Element} The Register page component.
 */
function Register(): JSX.Element {
  const { register } = useContext(AuthContext);
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
  const goTo = useCallback((page: string) => {
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
      await register(form.email.value, form.password.value);
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
              <h2 className="text-center">{t('register_title')}</h2>

              {formInvalid ? (
                <Alert variant="danger">
                  { errorMessage }
                </Alert>
              ) : null}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('register_email_label')}</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder={t('register_email_placeholder')}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{t('register_password_label')}</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder={t('register_password_placeholder')}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  {t('register_btn_submit')}
                </Button>
              </Form>

              <div className="text-center mt-3">
                {`${t('register_has_account')} `}
                <Link to="/login" className="text-decoration-none">
                  {t('register_go_login')}
                </Link>
              </div>

              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  {t('register_back_home')}
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
