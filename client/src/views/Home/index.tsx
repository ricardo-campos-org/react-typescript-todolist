import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap';
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
import ContentHeader from '../../components/ContentHeader';
import AlertError from '../../components/AlertError';
import { Search } from 'react-bootstrap-icons';
import HomeFilterButton from '../../components/HomeFilterButton';

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
  const [tags, setTags] = useState<string[]>([]);
  const [validated, setValidated] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<HomeSearchResponse | null>(null);
  const [name, setName] = useState<string>(user?.name ? user?.name : 'User');

  /**
   * Handles the error by setting the error message.
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
   * Searches for a term.
   *
   * @param {string}
   * @returns {Promise<boolean>} Whether the search was successful.
   */
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

  /**
   * Handles the search form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(false);
    setHasError(false);

    const form = event.currentTarget;
    const textToSearch = form.search_term.value;
    if (textToSearch.length === 0) {
      form.reset();
      setHasError(false);
      setSearchResults(null);
      return;
    }

    if (textToSearch.length <= 3) {
      setErrorMessage(translateServerResponse('Please type at least 3 characters', i18n.language));
      setHasError(true);
      return;
    }

    const searched: boolean = await searchTerm(form.search_term.value);
    if (searched) {
      form.reset();
    }
  };

  const loadTasks = async (filter: string): Promise<void> => {
    try {
      const response: TaskResponse[] = await api.getJSON(`${ApiConfig.homeUrl}/tasks/${filter}`);
      const result: HomeSearchResponse = {
        tasks: response,
        notes: []
      };
      setSearchResults(result);
    }
    catch (e) {
      handleError(e);
    }
  };

  const loadTags = async (): Promise<void> => {
    try {
      const response: string[] = await api.getJSON(`${ApiConfig.homeUrl}/tasks/tags`);
      setTags(response);
    }
    catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    handleDefaultLang();
    setName(user?.name ? user?.name : 'User');
    loadTags();
  }, [user]);

  return (
    <Container fluid>
      <ContentHeader
        h1TextRegular={t('home_welcome_title')}
        h1TextBold={name}
        subtitle="Welcome to TaskNote! Get ready to complete your pending tasks"
        h2BlackText="Start Your Day, Be"
        h2GreenText="Productive"
        isHomeComponent
      />

      <Row className="mb-4">
        <Col xs={12}>
          <Card>
            <Card.Body>

              <AlertError
                errorMessage={errorMessage}
                onClose={() => {
                  setErrorMessage('');
                  setHasError(false);
                  setValidated(false);
                }}
              />

              <Form noValidate validated={validated} onSubmit={handleSearch}>
                <InputGroup className={`me-auto ${hasError ? 'is-invalid border border-danger rounded' : ''}`}>
                  <InputGroup.Text>
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    id="search_term"
                    name="search_term"
                    placeholder="Search tasks & notes"
                  />
                </InputGroup>

                <Row className="mt-2">
                  <Col xs={12}>
                    <HomeFilterButton
                      text="🔥 Only High Priority"
                      type="high"
                      onClick={() => loadTasks('high')}
                    />
                    <HomeFilterButton
                      text="All pending"
                      type="all"
                      onClick={() => loadTasks('all')}
                    />
                    {tags.map((tag: string) => (
                      <HomeFilterButton
                        key={tag}
                        text={`#${tag}`}
                        type="tag"
                        onClick={() => loadTasks(tag)}
                      />
                    ))}
                    <HomeFilterButton
                      text="Clear result"
                      type="tag"
                      onClick={() => setSearchResults(null)}
                    />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {searchResults && (
          <Col xs={12}>
            <p>{t('home_card_search_result_label')}</p>

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
        )}
      </Row>

      <Row className="mb-4">
        <Col xs={12} lg={6} className="mb-4">
          <CompletedTasks />
        </Col>
        <Col xs={12} lg={6}>
          <TaskProgress />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
