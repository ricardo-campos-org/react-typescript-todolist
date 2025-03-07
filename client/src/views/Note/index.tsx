import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Row
} from 'react-bootstrap';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { NoteResponse } from '../../types/NoteResponse';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import { translateServerResponse } from '../../utils/TranslatorUtils';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import TaskUrl from '../../components/TaskUrl';
import NoteTitle from '../../components/NoteTitle';
import './style.css';
import ModalMarkdown from '../../components/ModalMarkdown';

/**
 *
 */
function Note(): React.ReactNode {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [notes, setNotes] = useState<NoteResponse[]>([]);
  const [savedNotes, setSavedNotes] = useState<NoteResponse[]>([]);
  const [filterText, setFilterText] = useState<string>('');
  const [showPreviewMd, setShowPreviewMd] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');
  const { i18n, t } = useTranslation();

  /**
   * Handle errors from server requests and translate them if required.
   *
   * @param {unknown} e The error to be handled.
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
   * Load notes from the server.
   */
  const loadNotes = async () => {
    try {
      const notesFetched: NoteResponse[] = await api.getJSON(ApiConfig.notesUrl);
      setNotes([...notesFetched]);
      setSavedNotes([...notesFetched]);
    }
    catch (e) {
      handleError(e);
    }
  };

  /**
   * Delete a note.
   *
   * @param {number} noteIdParam The note ID to be deleted.
   */
  const deleteNote = async (noteIdParam: number) => {
    try {
      await api.deleteNoContent(`${ApiConfig.notesUrl}/${noteIdParam}`);
      loadNotes();
    }
    catch (e) {
      handleError(e);
    }
  };

  /**
   * Filter notes by a given text.
   */
  const filterNotes = (text: string): void => {
    setFilterText(text);

    if (!text) {
      setNotes([...savedNotes]);
      return;
    }

    const filteredTasks = savedNotes.filter((note: NoteResponse) => {
      const shouldFilter = note.description.toLowerCase().includes(text.toLowerCase())
        || note.title.toLowerCase().includes(text.toLowerCase())
        || (note.url && note.url.includes(text.toLowerCase()));
      return shouldFilter;
    });

    setNotes([...filteredTasks]);
  };

  const handleCloseModal = () => setShowPreviewMd(false);

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <Container>
      <h1 className="poppins-regular home-hello main-margin">
        All
        {' '}
        <b>Notes</b>
      </h1>
      <p className="poppins-regular home-subtitle">
        Save your notes in plain text or Markdown format
      </p>

      <Row className="mb-3">
        <Col xs={12}>
          <h2 className="poppins-regular">Create, Filter, and Easily Find</h2>
          <h2 className="poppins-bold home-productive">Them</h2>
        </Col>
      </Row>

      <Row className="main-margin">
        <Col xs={12}>
          {errorMessage.length > 0 && (
            <Alert variant="danger">
              { errorMessage }
            </Alert>
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={9}>
          <Form.Control
            type="text"
            id="search_term"
            size="lg"
            name="search_term"
            placeholder="Filter notes"
            value={filterText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterNotes(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <NavLink to="/notes/new">
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" type="button" className="d-grip">
                Add note
              </Button>
            </div>
          </NavLink>
        </Col>
      </Row>

      <Row className="mt-3">
        {notes.map((note: NoteResponse) => (
          <Col xs={12} key={note.id.toString()}>
            <Card key={note.id.toString()} className="task-card">
              <Card.Body>
                <Row>
                  <Col xs={10}>
                    <Card.Title>
                      <NoteTitle title={note.title} />
                    </Card.Title>
                  </Col>
                  <Col xs={2} className="text-end">
                    <Dropdown>
                      <Dropdown.Toggle variant="success">
                        <ThreeDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <NavLink to={`/notes/edit/${note.id}`}>
                          <Dropdown.Item as="span">
                            {t('task_table_action_edit')}
                          </Dropdown.Item>
                        </NavLink>
                        <Dropdown.Item as="button" onClick={() => deleteNote(note.id)}>
                          {t('task_table_action_delete')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>

                {note.url && note.url.length > 0 && (
                  <TaskUrl url={note.url} />
                )}
              </Card.Body>
              <Card.Footer className="task-card-footer">
                <a
                  href="#"
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setModalTitle(note.title);
                    setModalContent(note.description);
                    setShowPreviewMd(true);
                  }}
                >
                  {' '}
                  Preview Markdown
                </a>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <ModalMarkdown
        show={showPreviewMd}
        onHide={handleCloseModal}
        title={modalTitle}
        markdownText={modalContent}
      />
    </Container>
  );
}

export default Note;
