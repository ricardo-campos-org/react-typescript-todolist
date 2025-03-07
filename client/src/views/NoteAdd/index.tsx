import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
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

type NoteAction = 'add' | 'edit';

/**
 * NoteAdd component for adding and editing notes.
 *
 * @returns {React.ReactNode} The rendered NoteAdd component.
 */
function NoteAdd(): React.ReactNode {
  const [validated, setValidated] = useState<boolean>(false);
  const [formInvalid, setFormInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [noteId, setNoteId] = useState<number>(0);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteDescription, setNoteDescription] = useState<string>('');
  const [noteUrl, setNoteUrl] = useState<string>('');
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
      setFormInvalid(true);
    }
    else if (e instanceof Error) {
      setErrorMessage(translateServerResponse(e.message, i18n.language));
      setFormInvalid(true);
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
    setNoteDescription('');

    setAction('add');
    setValidated(false);
    setFormInvalid(false);
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
      setFormInvalid(true);
      setErrorMessage(translateServerResponse('Please fill in all the fields', i18n.language));
      return;
    }

    setFormInvalid(false);

    const title: string = form.note_title.value;
    const description: string = form.note_description.value;

    if (action === 'add') {
      const payload: NoteResponse = {
        id: 0,
        title,
        description,
        url: noteUrl ? noteUrl : null
      };

      const added: boolean = await addNote(payload);
      if (added) {
        form.reset();
        resetInputs();
        navigate('/notes');
      }
    }
    else if (action === 'edit') {
      const payload: NoteResponse = {
        id: noteId,
        title,
        description,
        url: noteUrl ? noteUrl : null
      };

      const edited: boolean = await submitEditNote(payload);
      if (edited) {
        form.reset();
        resetInputs();
        navigate('/notes');
      }
    }
  };

  /**
   * Checks if the URL is for editing a task and loads the task data if it is.
   */
  const checkEditUrl = async (): Promise<void> => {
    if (params.id) {
      try {
        const noteToEdit: NoteResponse = await api.getJSON(`${ApiConfig.notesUrl}/${params.id}`);
        setNoteId(noteToEdit.id);
        setNoteTitle(noteToEdit.title);
        setNoteDescription(noteToEdit.description);
        setAction('edit');
      }
      catch (e) {
        handleError(e);
      }
    }
  };

  const previewMarkdown = (e: React.MouseEvent<Element, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    setShowPreviewMd(noteDescription.length > 0);
  };

  const handleCloseModal = () => setShowPreviewMd(false);

  useEffect(() => {
    checkEditUrl();
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
          <Card>
            <Card.Body>
              <Card.Title>{t('note_form_title')}</Card.Title>

              {formInvalid
                ? (
                    <Alert variant="danger">
                      { errorMessage }
                    </Alert>
                  )
                : null}

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
                    required
                    size="lg"
                    rows={15}
                    name="note_description"
                    aria-describedby="noteDescriptionHelper"
                    placeholder={t('note_form_content_placeholder')}
                    value={noteDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setNoteDescription(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                >
                  {t('note_form_submit')}
                </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ModalMarkdown
        show={showPreviewMd}
        onHide={handleCloseModal}
        title={noteTitle}
        markdownText={noteDescription}
      />
    </Container>
  );
}

export default NoteAdd;
