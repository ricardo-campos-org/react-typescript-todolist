import React, { useEffect, useState } from 'react';
import {
  Alert, Badge, Button, Card, Col, Container, Form, InputGroup, ListGroup, Row, Table
} from 'react-bootstrap';
import TaskNoteRequest from '../../types/TaskNoteRequest';
import { TaskResponse, TaskUrlResponse } from '../../types/TaskResponse';
import { useTranslation } from 'react-i18next';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import { translateMessage, translateTaskResponse } from '../../utils/TranslatorUtils';
import { ArrowUpSquare, ArrowUpSquareFill, CalendarCheck, CheckSquare, PencilFill, Square } from 'react-bootstrap-icons';
import './style.css';

type TaskAction = 'add' | 'edit';

/**
 *
 */
function Task(): JSX.Element {
  const [validated, setValidated] = useState<boolean>(false);
  const [formInvalid, setFormInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [taskId, setTaskId] = useState<number>(0);
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskUrl, setTaskUrl] = useState<string>('');
  const [taskUrlId, setTaskUrlId] = useState<number>(0);
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [action, setAction] = useState<TaskAction>('add');
  const { i18n, t } = useTranslation();

  const handleError = (e: unknown): void => {
    if (typeof e === 'string') {
      setErrorMessage(translateMessage(e, i18n.language));
      setFormInvalid(true);
    }
    else if (e instanceof Error) {
      setErrorMessage(translateMessage(e.message, i18n.language));
      setFormInvalid(true);
    }
  };

  const loadTasks = async () => {
    try {
      const tasksFetched: TaskResponse[] = await api.getJSON(ApiConfig.tasksUrl);
      tasksFetched.sort((t1, t2) => {
        if (t1.done === t2.done) {
          return 0;
        }
        return t1.done ? 1 : -1;
      });
      setTasks(translateTaskResponse(tasksFetched, i18n.language));
    }
    catch (e) {
      handleError(e);
    }
  };

  const addTask = async (desc: string, url?: string): Promise<boolean> => {
    const payload: TaskNoteRequest = {
      description: desc,
      urls: url ? [url] : []
    };

    try {
      await api.postJSON(ApiConfig.tasksUrl, payload);
      loadTasks();
      return true;
    }
    catch (e) {
      handleError(e);
    }

    return false;
  };

  const submitEditTask = async (payload: TaskResponse): Promise<boolean> => {
    try {
      await api.patchJSON(`${ApiConfig.tasksUrl}/${payload.id}`, payload);
      loadTasks();
      return true;
    }
    catch (e) {
      handleError(e);
    }
    return false;
  };

  const resetInputs = () => {
    setTaskId(0);
    setTaskDescription('');
    setTaskDone(false);
    setTaskUrl('');
    setTaskUrlId(0);
    setAction('add');
    setValidated(false);
    setFormInvalid(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setFormInvalid(true);
      setErrorMessage(translateMessage('Please fill in all the fields', i18n.language));
      return;
    }

    setFormInvalid(false);

    if (action === 'add') {
      const added: boolean = await addTask(form.description.value, form.url.value);
      if (added) {
        form.reset();
        resetInputs();
      }
    }
    else if (action === 'edit') {
      const urls: TaskUrlResponse[] = [];
      if (taskUrlId) {
        urls.push({ url: '', id: taskUrlId });
      }
      if (taskUrl) {
        urls.push({ url: taskUrl, id: null });
      }

      const payload: TaskResponse = {
        id: taskId,
        description: taskDescription,
        done: taskDone,
        lastUpdate: '',
        urls
      };

      const edited: boolean = await submitEditTask(payload);
      if (edited) {
        form.reset();
        resetInputs();
      }
    }
  };

  const markAsDone = async (task: TaskResponse) => {
    try {
      const updatedTask = {
        ...task,
        done: !task.done
      };
      await api.patchJSON(`${ApiConfig.tasksUrl}/${task.id}`, updatedTask);
      loadTasks();
    }
    catch (e) {
      handleError(e);
    }
  };

  const editTask = async (task: TaskResponse) => {
    setTaskId(task.id);
    setTaskDescription(task.description);
    setTaskUrl(task.urls.length ? task.urls[0].url : '');
    setTaskUrlId(task.urls.length ? task.urls[0].id || 0 : 0);
    setTaskDone(task.done);
    setAction('edit');
  };

  const deleteTask = async (taskIdParam: number) => {
    try {
      await api.deleteNoContent(`${ApiConfig.tasksUrl}/${taskIdParam}`);
      loadTasks();
    }
    catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container>
      {/* Form to add, edit and save tasks */}
      <Row className="mt-3">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>{t('task_form_title')}</Card.Title>

              {formInvalid
                ? (
                    <Alert variant="danger">
                      { errorMessage }
                    </Alert>
                  )
                : null}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="task-form-description">
                      <Form.Label>{t('task_form_desc_label')}</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          <PencilFill />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="text"
                          name="description"
                          placeholder={t('task_form_desc_placeholder')}
                          value={taskDescription}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTaskDescription(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="task-form-url">
                      <Form.Label>{t('task_form_url_label')}</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          required={false}
                          type="text"
                          name="url"
                          placeholder={t('task_form_url_placeholder')}
                          value={taskUrl}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTaskUrl(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3" controlId="task-form-due-date">
                      <Form.Label>{t('task_form_duedate_label')}</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          <CalendarCheck />
                        </InputGroup.Text>
                        <Form.Control
                          required={false}
                          type="text"
                          name="url"
                          placeholder={t('task_form_duedate_placeholder')}
                          value={taskUrl}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTaskUrl(e.target.value);
                          }}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Check
                  type="switch"
                  id="high-priority-input"
                  label="High priority"
                  className="mb-3"
                />

                <Button variant="primary" type="submit">
                  {t('task_form_submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Tasks added */}
      <Row className="mt-3">
        <Col xs={12}>
          {tasks.map((task: TaskResponse) => (
            <Card key={task.id.toString()} className="my-2">
              <Card.Body>
                <Card.Title>
                  {!task.highPriority && (
                    <>
                      {task.done
                        ? <ArrowUpSquareFill onClick={() => markAsDone(task)} className="task-icon" />
                        : <ArrowUpSquare onClick={() => markAsDone(task)} className="task-icon" />}
                      <span className="priority-normal">
                        NORMAL
                      </span>
                    </>
                  )}
                  {task.highPriority && (
                    <>
                      {task.done
                        ? <CheckSquare onClick={() => markAsDone(task)} className="task-icon" />
                        : <Square onClick={() => markAsDone(task)} className="task-icon" />}
                      <span className="priority-high">
                        HIGH
                      </span>
                    </>
                  )}
                  {task.done && (
                    <span className="priority-done">DONE</span>
                  )}
                  {task.description}
                </Card.Title>
                <Row>
                  <Col xs={6}>
                    <span className="task-last-update">Tomorrow</span>
                    <span className="task-pipe">|</span>
                    <span className="task-last-update">URL</span>
                    <span className="task-pipe">|</span>
                    <span className="task-last-update">{task.lastUpdate}</span>
                  </Col>
                  <Col xs={6} className="text-end">
                    <span className="task-link">Edit</span>
                    <span className="task-pipe">|</span>
                    <span className="task-link">Delete</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th scope="col" style={{ width: '5%' }}>#</th>
                <th scope="col" style={{ width: '50%' }}>{t('task_table_description')}</th>
                <th scope="col" style={{ width: '10%' }}>{t('task_table_done')}</th>
                <th scope="col" style={{ width: '10%' }}>URL</th>
                <th scope="col" style={{ width: '25%' }}>{t('task_table_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: TaskResponse) => (
                <tr key={`task-${task.id}`}>
                  <th scope="row" className={task.done ? 'text-done' : ''}>{task.id}</th>
                  <td className={task.done ? 'text-done' : ''}>
                    {task.description}
                    <br />
                    <small className={task.done ? '' : 'time-ago'}>{task.lastUpdate}</small>
                  </td>
                  <td className={task.done ? 'text-done' : ''}>
                    {
                      task.done
                        ? t('task_table_action_done_yes')
                        : t('task_table_action_done_no')
                    }
                  </td>
                  <td className={task.done ? 'text-done' : ''}>
                    {task.urls.length > 0
                      ? (
                          <a href={`${task.urls[0].url}`}>Link</a>
                        )
                      : '-'}
                  </td>
                  <td className={task.done ? 'text-done' : ''}>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => markAsDone(task)}
                      className="btn-action"
                    >
                      {task.done ? t('task_table_action_undone') : t('task_table_action_done')}
                    </Button>

                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={() => editTask(task)}
                      className="btn-action"
                    >
                      {t('task_table_action_edit')}
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteTask(task.id)}
                      className="btn-action"
                    >
                      {t('task_table_action_delete')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Task;
