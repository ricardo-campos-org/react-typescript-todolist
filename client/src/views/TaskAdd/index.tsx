import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import TaskNoteRequest from '../../types/TaskNoteRequest';
import { TaskResponse } from '../../types/TaskResponse';
import { useTranslation } from 'react-i18next';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import { translateServerResponse } from '../../utils/TranslatorUtils';
import FormInput from '../../components/FormInput';
import ContentHeader from '../../components/ContentHeader';
import AlertError from '../../components/AlertError';

type TaskAction = 'add' | 'edit';

/**
 * TaskAdd component for adding and editing tasks.
 *
 * @returns {React.ReactNode} The rendered TaskAdd component.
 */
function TaskAdd(): React.ReactNode {
  const [validated, setValidated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [taskId, setTaskId] = useState<number>(0);
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskUrl, setTaskUrl] = useState<string>('');
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [action, setAction] = useState<TaskAction>('add');
  const [dueDate, setDueDate] = useState<string>('');
  const [highPriority, setHighPriority] = useState<boolean>(false);
  const [tag, setTag] = useState<string>('');
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
   * Adds a new task.
   *
   * @param {TaskNoteRequest} payload - The task data to add.
   * @returns {Promise<boolean>} True if the task was added successfully, false otherwise.
   */
  const addTask = async (payload: TaskNoteRequest): Promise<boolean> => {
    try {
      await api.postJSON(ApiConfig.tasksUrl, payload);
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
  const submitEditTask = async (payload: TaskResponse): Promise<boolean> => {
    try {
      await api.patchJSON(`${ApiConfig.tasksUrl}/${payload.id}`, payload);
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
  const resetInputs = (): void => {
    setTaskId(0);
    setTaskDescription('');
    setTaskDone(false);
    setTaskUrl('');
    setDueDate('');
    setHighPriority(false);
    setTag('');

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
      const addPayload: TaskNoteRequest = {
        description: taskDescription.trim(),
        highPriority: highPriority,
        dueDate: dueDate || '',
        tag: tag,
        urls: taskUrl ? [taskUrl] : []
      };

      const added: boolean = await addTask(addPayload);
      if (added) {
        form.reset();
        resetInputs();
        navigate('/tasks');
      }
    }
    else if (action === 'edit') {
      const editPayload: TaskResponse = {
        id: taskId,
        description: taskDescription.trim(),
        done: taskDone,
        highPriority: highPriority,
        dueDate: dueDate || '',
        dueDateFmt: '',
        lastUpdate: '',
        tag: tag,
        urls: taskUrl ? [taskUrl] : []
      };

      const edited: boolean = await submitEditTask(editPayload);
      if (edited) {
        form.reset();
        resetInputs();
        navigate('/tasks');
      }
    }
  };

  /**
   * Checks if the URL is for editing a task and loads the task data if it is.
   */
  const checkEditUrl = async (): Promise<void> => {
    if (params.id) {
      try {
        const taskToEdit: TaskResponse = await api.getJSON(`${ApiConfig.tasksUrl}/${params.id}`);
        setTaskId(taskToEdit.id);
        setTaskDescription(taskToEdit.description);
        setTaskUrl(taskToEdit.urls.length ? taskToEdit.urls[0] : '');
        setTaskDone(taskToEdit.done);
        if (taskToEdit.dueDateFmt) {
          setDueDate(taskToEdit.dueDate);
        }
        setHighPriority(taskToEdit.highPriority);
        if (taskToEdit.tag) {
          setTag(taskToEdit.tag);
        }
        setAction('edit');
      }
      catch (e) {
        handleError(e);
      }
    }
  };

  useEffect(() => {
    checkEditUrl();
  }, []);

  return (
    <Container>
      <ContentHeader
        h1TextRegular="All"
        h1TextBold="Tasks"
        subtitle="Be on top of your TODO list"
        h2BlackText="Create, Filter, and Easily Find"
        h2GreenText="Them"
      />

      {/* Form to add, edit and save tasks */}
      <Row className="main-margin">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>{t('task_form_title')}</Card.Title>

              <AlertError errorMessage={errorMessage} />

              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                {/* Description */}
                <FormInput
                  labelText={t('task_form_desc_label')}
                  iconName="PencilFill"
                  required={true}
                  type="text"
                  name="description"
                  placeholder={t('task_form_desc_placeholder')}
                  value={taskDescription}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTaskDescription(e.target.value);
                  }}
                />

                {/* Task URL */}
                <FormInput
                  labelText={t('task_form_url_label')}
                  iconName="At"
                  required={false}
                  type="text"
                  name="url"
                  placeholder={t('task_form_url_placeholder')}
                  value={taskUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTaskUrl(e.target.value);
                  }}
                />

                {/* Due date */}
                <FormInput
                  labelText={t('task_form_duedate_label')}
                  iconName="CalendarCheck"
                  required={false}
                  type="text"
                  name="dueDate"
                  placeholder={t('task_form_duedate_placeholder')}
                  value={dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDueDate(e.target.value);
                  }}
                />

                {/* Tag */}
                <FormInput
                  labelText="Tags"
                  iconName="Hash"
                  required={false}
                  type="text"
                  name="tag"
                  placeholder="my-tag"
                  value={tag}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTag(e.target.value);
                  }}
                />

                <Form.Check
                  type="switch"
                  id="high-priority-input"
                  label="High priority"
                  className="mb-3"
                  name="highPriority"
                  checked={highPriority}
                  onChange={() => setHighPriority(!highPriority)}
                />

                <Button variant="primary" type="submit">
                  {t('task_form_submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskAdd;
