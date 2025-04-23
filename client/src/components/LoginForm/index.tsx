import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../context/AuthContext';
import { translateServerResponse } from '../../utils/TranslatorUtils';
import { handleDefaultLang } from '../../lang-service/LangHandler';
import FormInput from '../FormInput';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';

/**
 * @returns {React.ReactNode} The form component for Login and Register pages.
 */
function LoginForm({ prefix }: { prefix: string }): React.ReactNode {
  const { signIn, register } = useContext(AuthContext);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [validated, setValidated] = useState<boolean>(false);
  const [formInvalid, setFormInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isResendEnabled, setIsResendEnabled] = useState(true);

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
      setErrorMessage(translateServerResponse('Please fill in your username and password!', i18n.language));
      return;
    }

    if (password !== passwordAgain) {
      setFormInvalid(true);
      setErrorMessage(translateServerResponse('Please fill in your username and password!', i18n.language));
    }

    setFormInvalid(false);
    try {
      if (prefix === 'login') {
        await signIn(email, password);
        goTo('/home');
      }
      else {
        await register(email, password, passwordAgain);
        // Do not clear the email, because user might request to resend
        setPassword('');
        setPasswordAgain('');
        setSuccessMessage('Please confirm your email before proceeding.');
        setSecondsLeft(30);
        setIsResendEnabled(false);
      }
    }
    catch (e) {
      setFormInvalid(true);
      if (typeof e === 'string') {
        setErrorMessage(translateServerResponse(e, i18n.language));
      }
      else if (e instanceof Error) {
        setErrorMessage(translateServerResponse(e.message, i18n.language));
      }
    }
  };

  const handleResend = async () => {
    try {
      await api.postJSON(ApiConfig.resendConfirmUrl, { email });

      setSuccessMessage('Confirmation email re-sent! Please check the spam folder.');
      setSecondsLeft(30);
      setIsResendEnabled(false);
    }
    catch (e) {
      setFormInvalid(true);
      if (typeof e === 'string') {
        setErrorMessage(translateServerResponse(e, i18n.language));
      }
      else if (e instanceof Error) {
        setErrorMessage(translateServerResponse(e.message, i18n.language));
      }
    }
  };

  useEffect(() => {
    handleDefaultLang();
  }, [formInvalid]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    else {
      setIsResendEnabled(true);
    }
  }, [secondsLeft]);

  return (
    <Container as="main" fluid className="login-page">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <Card>
            <Card.Body className="p-4">
              <h2 className="text-center">{t(`${prefix}_title`)}</h2>

              {formInvalid
                ? (
                    <Alert variant="danger">
                      { errorMessage }
                    </Alert>
                  )
                : null}

              {successMessage.length > 1 && (
                <>
                  <Alert variant="success">
                    { successMessage }
                  </Alert>

                  <div className="text-center">
                    <Button
                      variant="outline-secondary"
                      onClick={handleResend}
                      disabled={!isResendEnabled}
                    >
                      {isResendEnabled ? 'Resend Confirmation Email' : `Resend in ${secondsLeft}s`}
                    </Button>
                  </div>
                </>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FormInput
                  labelText="Email"
                  iconName="At"
                  required={true}
                  name="email"
                  placeholder={t(`${prefix}_email_placeholder`)}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                />

                <FormInput
                  labelText="Password"
                  iconName="Lock"
                  required={true}
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                  data_testid="account-password-login"
                />

                {prefix === 'register' && (
                  <FormInput
                    labelText="Repeat password"
                    iconName="Lock"
                    required={true}
                    type="password"
                    name="passwordAgain"
                    value={passwordAgain}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPasswordAgain(e.target.value);
                    }}
                  />
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  {t(`${prefix}_btn_submit`)}
                </Button>
              </Form>

              <div className="text-center mt-3">
                {prefix === 'login'
                  ? (
                      `${t('login_account')} `
                    )
                  : `${t('register_account')} `}
                <Link to={prefix === 'login' ? '/register' : '/login'} className="text-decoration-none">
                  {t(`${prefix}_go_other`)}
                </Link>
              </div>

              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  {t(`${prefix}_back_home`)}
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
