import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { NoteResponse } from '../../types/NoteResponse';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import { translateServerResponse } from '../../utils/TranslatorUtils';
import FormInput from '../../components/FormInput';
import ModalMarkdown from '../../components/ModalMarkdown';
import AlertError from '../../components/AlertError';
import ContentHeader from '../../components/ContentHeader';

type NoteAction = 'add' | 'edit';

/**
 * NoteAdd component for adding and editing notes.
 *
 * @returns {React.ReactNode} The rendered NoteAdd component.
 */
function NoteAdd(): React.ReactNode {
  const [validated, setValidated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [noteId, setNoteId] = useState<number>(0);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteUrl, setNoteUrl] = useState<string>('');
  const [noteTag, setNoteTag] = useState<string>('');
  const [action, setAction] = useState<NoteAction>('add');
  const [showPreviewMd, setShowPreviewMd] = useState<boolean>(false);
  const { i18n, t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

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
   * Adds a new note.
   *
   * @param {TaskNoteRequest} payload - The task data to add.
   * @returns {Promise<boolean>} True if the task was added successfully, false otherwise.
   */
  const addNote = async (payload: NoteResponse): Promise<boolean> => {
    try {
      await api.postJSON(ApiConfig.notesUrl, payload);
      return true;
    }
    catch (e) {
      handleError(e);
    }

    return false;
  };

  /**
   * Submits the edited task.
   *
   * @param {TaskResponse} payload - The task data to edit.
   * @returns {Promise<boolean>} True if the task was edited successfully, false otherwise.
   */
  const submitEditNote = async (payload: NoteResponse): Promise<boolean> => {
    try {
      await api.patchJSON(`${ApiConfig.notesUrl}/${payload.id}`, payload);
      return true;
    }
    catch (e) {
      handleError(e);
    }
    return false;
  };

  /**
   * Resets the input fields to their default values.
   */
  const resetInputs = () => {
    setNoteId(0);
    setNoteTitle('');
    setNoteUrl('');
    setNoteContent('');
    setNoteTag('');

    setAction('add');
    setValidated(false);
  };

  /**
   * Handles the form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setErrorMessage(translateServerResponse('Please fill in all the fields', i18n.language));
      return;
    }

    if (action === 'add') {
      const payload: NoteResponse = {
        id: 0,
        title: noteTitle,
        description: noteContent,
        url: noteUrl,
        tag: noteTag,
        lastUpdate: ''
      };

      const added: boolean = await addNote(payload);
      if (added) {
        form.reset();
        resetInputs();
        navigate('/home');
      }
    }
    else if (action === 'edit') {
      const payload: NoteResponse = {
        id: noteId,
        title: noteTitle,
        description: noteContent,
        url: noteUrl,
        tag: noteTag,
        lastUpdate: ''
      };

      const edited: boolean = await submitEditNote(payload);
      if (edited) {
        form.reset();
        resetInputs();
        navigate('/home');
      }
    }
  };

  /**
   * Checks if the URL is for editing a task and loads the task data if it is.
   */
  const checkEditUrl = async (): Promise<void> => {
    if (params?.id) {
      try {
        const noteToEdit: NoteResponse = await api.getJSON(`${ApiConfig.notesUrl}/${params.id}`);
        setNoteFromServer(noteToEdit);
        setAction('edit');
      }
      catch (e) {
        handleError(e);
      }
    }
  };

  const checkCloneUrl = async (): Promise<void> => {
    const { search } = window.location;

    if (!search || !search.startsWith('?') || !search.includes('cloneFrom=')) {
      return;
    }

    const index = search.indexOf('=');
    if (search.length - index > 4) {
      return;
    }

    const idToClone = search.substring(index + 1);
    if (idToClone && !isNaN(parseInt(idToClone))) {
      try {
        const noteToClone: NoteResponse = await api.getJSON(`${ApiConfig.notesUrl}/${idToClone}`);
        setNoteFromServer(noteToClone);
      }
      catch (e) {
        handleError(e);
      }
    }
  };

  const setNoteFromServer = (noteContent: NoteResponse) => {
    setNoteId(noteContent.id);
    setNoteTitle(noteContent.title);
    if (noteContent.url) {
      setNoteUrl(noteContent.url);
    }
    if (noteContent.tag) {
      setNoteTag(noteContent.tag);
    }
    setNoteContent(noteContent.description);
  };

  /**
   * Display the Markdown text in Markdown format on a modal.
   *
   * @param {React.MouseEvent<Element, MouseEvent>} e The mouse click event.
   */
  const previewMarkdown = (e: React.MouseEvent<Element, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    setShowPreviewMd(noteContent.length > 0);
  };

  /**
   * Closes the Markdown preview modal.
   */
  const handleCloseModal = (): void => setShowPreviewMd(false);

  useEffect(() => {
    checkEditUrl();
    checkCloneUrl();
  }, []);

  return (
    <Container fluid>
      <ContentHeader
        h1TextRegular="Add"
        h1TextBold="Note"
        subtitle="Save your notes in plain text or Markdown format"
        h2BlackText="Create, Filter, and Easily Find"
        h2GreenText="Them"
      />

      <Row className="main-margin">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>{t('note_form_title')}</Card.Title>

              <AlertError
                errorMessage={errorMessage}
                onClose={() => setErrorMessage('')}
              />

              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {/* Note title */}
                <FormInput
                  labelText={t('note_form_title_label')}
                  iconName="JournalCheck"
                  required={true}
                  type="text"
                  name="note_title"
                  placeholder={t('note_form_title_placeholder')}
                  value={noteTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNoteTitle(e.target.value);
                  }}
                />

                <Row>
                  <Col xs={12} xl={9}>
                    {/* Note URL */}
                    <FormInput
                      labelText={t('task_form_url_label')}
                      iconName="At"
                      required={false}
                      type="text"
                      name="url"
                      placeholder={t('task_form_url_placeholder')}
                      value={noteUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNoteUrl(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xs={12} xl={3}>
                    {/* Tag */}
                    <FormInput
                      labelText="Tag"
                      iconName="Hash"
                      required={false}
                      type="text"
                      name="tag"
                      placeholder="my-tag (Optional)"
                      value={noteTag}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNoteTag(e.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <Form.Group controlId="form_noteDescription">
                  <Form.Label>
                    {t('note_form_content_label')}
                    <small>
                      <a href="#" onClick={previewMarkdown}>
                        {' '}
                        Preview Markdown
                      </a>
                    </small>
                  </Form.Label>
                  <Form.Control
                    className="font-size-14"
                    as="textarea"
                    required={true}
                    size="lg"
                    rows={15}
                    name="note_description"
                    aria-describedby="noteDescriptionHelper"
                    placeholder={t('note_form_content_placeholder')}
                    value={noteContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setNoteContent(e.target.value);
                    }}
                    data-testid="note-content-input-area"
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="home-new-item task-note-btn mt-3"
                >
                  {t('note_form_submit')}
                </button>

                <button
                  type="button"
                  className="ms-2 home-new-item-secondary task-note-btn"
                  onClick={() => {
                    navigate('/home');
                  }}
                >
                  Cancel
                </button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ModalMarkdown
        show={showPreviewMd}
        onHide={handleCloseModal}
        title={noteTitle}
        markdownText={noteContent}
      />
    </Container>
  );
}

export default NoteAdd;
