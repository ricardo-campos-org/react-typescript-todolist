import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { clearStorage, setDefaultLang } from '../../storage-service/storage';
import AuthContext from '../../context/AuthContext';
import { LangAvailable, languages } from '../../constants/languages_available';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import FormInput from '../../components/FormInput';
import { translateServerResponse } from '../../utils/TranslatorUtils';
import { UserPatchRequest } from '../../types/UserPatchRequest';
import { UserResponse } from '../../types/UserResponse';
import ContentHeader from '../../components/ContentHeader';
import AlertError from '../../components/AlertError';

/**
 * Account page component.
 *
 * This component displays information about the user's account.
 *
 * @returns {React.ReactNode} The Account page component.
 */
function Account(): React.ReactNode {
  const { signOut, user, updateUser } = useContext(AuthContext);
  const { i18n, t } = useTranslation();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userPasswordAgain, setUserPasswordAgain] = useState<string>('');

  /**
   * Handle the language change.
   *
   * @param {string} lang the language to change to.
   */
  const handleLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    setDefaultLang(lang);
    patchLanguage(lang);
  };

  /**
   * Deletes the user account
   */
  const deleteAccount = async (): Promise<void> => {
    setShowAlert(false);
    await api.postJSON(ApiConfig.deleteAccountUrl, {});
    signOut();
    clearStorage();
  };

  /**
   * Handles errors by setting the error message and form invalid state.
   *
   * @param {unknown} e - The error to handle.
   */
  const handleError = (e: unknown): void => {
    if (typeof e === 'string') {
      setErrorMessage(translateServerResponse(e, i18n.language));
    }
    else if (e instanceof Error) {
      setErrorMessage(translateServerResponse(e.message, i18n.language));
    }
  };

  /**
   * Patches a user into.
   *
   * @param {UserPatchRequest} payload - The user data to patch.
   * @returns {Promise<boolean>} True if the task was added successfully, false otherwise.
   */
  const patchUserInfo = async (payload: UserPatchRequest): Promise<UserResponse | undefined> => {
    try {
      return await api.patchJSON(ApiConfig.userUrl, payload) as UserResponse;
    }
    catch (e) {
      handleError(e);
    }
  };

  /**
   * Resets the input fields to their default values.
   */
  const resetInputs = (userUpdated: UserResponse): void => {
    setUserName('');
    setUserEmail('');
    updateUser(userUpdated);

    setValidated(false);
  };

  const patchLanguage = async (lang: string): Promise<void> => {
    const patchPayload: UserPatchRequest = {
      name: null,
      email: '',
      password: '',
      passwordAgain: '',
      lang: lang
    };

    await patchUserInfo(patchPayload);
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event?.preventDefault();
    event?.stopPropagation();
    setValidated(true);
    setErrorMessage('');

    const form = event?.currentTarget;

    const patchPayload: UserPatchRequest = {
      name: userName ? DOMPurify.sanitize(userName) : null,
      email: userEmail,
      password: userPassword,
      passwordAgain: userPasswordAgain,
      lang: ''
    };

    const sizeOfPayload = JSON.stringify(patchPayload).length;
    if (sizeOfPayload === 67) {
      setErrorMessage(translateServerResponse('Nothing to update!', i18n.language));
      return;
    }

    const updated: UserResponse | undefined = await patchUserInfo(patchPayload);
    if (updated) {
      form?.reset();
      resetInputs(updated);
      if (userEmail !== '') {
        signOut();
        clearStorage();
      }
    }
  };

  useEffect(() => {}, [user]);

  return (
    <Container fluid>
      <ContentHeader
        h1TextRegular={t('account_header_my')}
        h1TextBold={t('account_header_account')}
        subtitle={t('account_my_account_hello')}
        h2BlackText={t('account_header_update_manage')}
        h2GreenText={t('account_header_data')}
      />

      <Row>
        <Col xs={12} lg={6}>
          <Card className="p-4">
            <Card.Body>
              <Card.Title>
                {t('account_data_update_header')}
              </Card.Title>

              <AlertError
                errorMessage={errorMessage}
                onClose={() => setErrorMessage('')}
              />

              <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-4">
                {/* User name */}
                <FormInput
                  labelText={t('account_form_first_name_label')}
                  iconName="Person"
                  required={false}
                  name="name"
                  placeholder={user?.name ?? t('account_form_first_name_placeholder')}
                  value={userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserName(e.target.value);
                  }}
                />

                {/* User email */}
                <FormInput
                  labelText={t('login_email_label')}
                  iconName="At"
                  required={false}
                  name="email"
                  placeholder={user?.email}
                  value={userEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserEmail(e.target.value);
                  }}
                />

                {/* User password */}
                <FormInput
                  labelText={t('login_password_label')}
                  iconName="Lock"
                  required={false}
                  type="password"
                  name="password"
                  value={userPassword}
                  placeholder={t('login_password_placeholder')}
                  pwdShowText={t('password_show_txt')}
                  pwdHideText={t('password_hide_txt')}
                  pwdHelperTxt={t('password_helper')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserPassword(e.target.value);
                  }}
                  data_testid="account-password-one"
                />

                {/* User password again */}
                <FormInput
                  labelText={t('register_password_repeat_label')}
                  iconName="Lock"
                  required={false}
                  type="password"
                  name="passwordAgain"
                  value={userPasswordAgain}
                  placeholder={t('login_password_placeholder')}
                  pwdShowText={t('password_show_txt')}
                  pwdHideText={t('password_hide_txt')}
                  pwdHelperTxt={t('password_helper')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserPasswordAgain(e.target.value);
                  }}
                />

                <div className="d-grid">
                  <button
                    type="submit"
                    className="home-new-item task-note-btn"
                  >
                    {t('account_form_save')}
                  </button>
                </div>
              </Form>
              <hr />
              <p>
                {t('account_form_gravatar_one')}
                <a href="https://gravatar.com" target="_blank" rel="noreferrer">Gravatar</a>
                {t('account_form_gravatar_two')}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6} className="mt-4 mt-lg-0">
          <Card className="p-4">
            <Card.Body>
              <Card.Title>{t('account_app_lang_title')}</Card.Title>
              <span className="description">{t('account_app_lang_description')}</span>
              <div className="mt-4 mb-2">{t('account_app_lang_available')}</div>
              <div>
                {languages.map((lang: LangAvailable) => (
                  <Button
                    key={lang.key}
                    type="button"
                    variant="outline-secondary"
                    className="btn-sm me-3 mb-3 d-block"
                    onClick={() => handleLanguage(lang.lang)}
                    data-testid={`language-button-${lang.lang}`}
                  >
                    {lang.lang === 'pt_br' && (
                      <span>🇧🇷 </span>
                    )}
                    {lang.lang === 'en' && (
                      <span>🇺🇸 </span>
                    )}
                    {lang.lang === 'es' && (
                      <span>🇪🇸 </span>
                    )}
                    {lang.lang === 'ru' && (
                      <span>🇷🇺 </span>
                    )}
                    {t(lang.key)}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-4 p-4">
            <Card.Body>
              <Card.Title>{t('account_privacy_little')}</Card.Title>
              <span className="description">
                {t('account_privacy_subtitle')}
              </span>

              <p className="mt-4 mb-2">{t('account_privacy_text')}</p>
              <Button
                variant="danger"
                type="button"
                onClick={() => setShowAlert(true)}
                className=""
              >
                {t('account_privacy_delete_btn')}
              </Button>

              {showAlert && (
                <Alert className="mt-3" variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  <Alert.Heading>{t('account_delete_title')}</Alert.Heading>
                  <p>{t('account_delete_description')}</p>
                  <Button onClick={() => deleteAccount()} variant="outline-danger">
                    {t('account_delete_btn')}
                  </Button>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
