import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { HomeSearchResponse } from '../../types/HomeSearchResponse';
import { TaskResponse } from '../../types/TaskResponse';
import { NoteResponse } from '../../types/NoteResponse';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import { handleDefaultLang } from '../../lang-service/LangHandler';
import { translateServerResponse } from '../../utils/TranslatorUtils';
import CompletedTasks from '../../components/CompletedTasks';
import TaskProgress from '../../components/TaskProgress';
import AuthContext from '../../context/AuthContext';
import './style.css';

/**
 * Home page component.
 *
 * This component displays the home page of the application,
 *
 * @returns {React.ReactNode} The Home page component.
 */
function Home(): React.ReactNode {
  const { user } = useContext(AuthContext);
  const { i18n, t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [formInvalid, setFormInvalid] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<HomeSearchResponse | null>(null);
  const [name, setName] = useState<string>(user?.name ? user?.name : 'User');

  const handleError = (e: unknown): void => {
    if (typeof e === 'string') {
      setErrorMessage(translateServerResponse(e, i18n.language));
    }
    else if (e instanceof Error) {
      setErrorMessage(translateServerResponse(e.message, i18n.language));
    }
  };

  const searchTerm = async (term: string): Promise<boolean> => {
    try {
      const response: HomeSearchResponse = await api.getJSON(`${ApiConfig.homeUrl}/search?term=${term}`);
      setSearchResults(response);
      return true;
    }
    catch (e) {
      handleError(e);
    }
    return false;
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setFormInvalid(true);
      setErrorMessage(translateServerResponse('Please type at least 3 characters', i18n.language));
      return;
    }

    setFormInvalid(false);
    const searched: boolean = await searchTerm(form.search_term.value);
    if (searched) {
      form.reset();
    }
  };

  useEffect(() => {
    handleDefaultLang();
    setName(user?.name ? user?.name : 'User');
  }, [user]);

  return (
    <Container>
      <h1 className="poppins-regular home-hello main-margin">
        {t('home_welcome_title')}
        <b>{name}</b>
      </h1>
      <p className="poppins-regular home-subtitle">
        Welcome to TaskNote! Get ready to complete your pending tasks
      </p>

      <Row className="mb-3">
        <Col xs={8}>
          <h2 className="poppins-regular">Start Your Day, Be</h2>
          <h2 className="poppins-bold home-productive">Productive</h2>
        </Col>
        <Col xs={4} className="text-end">
          <NavLink to="/tasks/new">
            <button
              type="button"
              className="home-new-item w-45 mb-2"
            >
              <PlusCircleFill size={25} />
              Add note
            </button>
          </NavLink>
          <NavLink to="/notes/new">
            <button
              type="button"
              className="home-new-item w-45"
            >
              <PlusCircleFill size={25} />
              Add task
            </button>
          </NavLink>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12} lg={6} className="mb-4">
          <CompletedTasks />
        </Col>
        <Col xs={12} lg={6}>
          <TaskProgress />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>{t('home_card_search_label')}</Card.Title>

              {formInvalid
                ? (
                    <Alert variant="danger">
                      { errorMessage }
                    </Alert>
                  )
                : null}

              <Form noValidate validated={validated} onSubmit={handleSearch}>
                <InputGroup className="mb-3">
                  <Form.Control
                    pattern=".{3,}"
                    required
                    type="text"
                    id="search_term"
                    name="search_term"
                    placeholder={t('home_card_search_placeholder')}
                  />
                  <Button type="submit" variant="primary" id="button-search">
                    {t('home_card_search_btn')}
                  </Button>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h2>{t('home_card_search_result_label')}</h2>

          <Accordion defaultActiveKey="0">
            {searchResults && searchResults.tasks.length > 0 && (
              searchResults.tasks.map((task: TaskResponse) => (
                <Accordion.Item key={task.description} eventKey={task.description}>
                  <Accordion.Header>
                    [Task]
                    {' '}
                    {task.description}
                  </Accordion.Header>
                  <Accordion.Body>
                    {task.urls.length > 0
                      ? (
                          <a href={`${task.urls[0]}`}>{task.urls[0]}</a>
                        )
                      : 'No URL!'}
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
            {searchResults && searchResults.notes.length > 0 && (
              searchResults.notes.map((note: NoteResponse) => (
                <Accordion.Item key={note.title} eventKey={note.title}>
                  <Accordion.Header>
                    [Note]
                    {' '}
                    {note.title}
                  </Accordion.Header>
                  <Accordion.Body>
                    <span className="span-line-break">
                      { note.description }
                    </span>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
            {searchResults?.tasks.length === 0 && searchResults?.notes.length === 0 && (
              <h3>{t('home_card_search_empty_result')}</h3>
            )}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
