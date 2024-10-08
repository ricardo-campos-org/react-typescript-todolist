import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Container, Form, Row, Table
} from 'react-bootstrap';
import TaskNoteRequest from '../../types/TaskNoteRequest';
import { TaskResponse, TaskUrlResponse } from '../../types/TaskResponse';
import api from '../../api-service/api';
import ApiConfig from '../../api-service/apiConfig';
import './style.css';

type TaskAction = 'add' | 'edit';

/**
 *
 */
function Task(): JSX.Element {
  const [validated, setValidated] = useState<boolean>(true);
  const [formInvalid, setFormInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [taskId, setTaskId] = useState<number>(0);
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskUrl, setTaskUrl] = useState<string>('');
  const [taskUrlId, setTaskUrlId] = useState<number>(0);
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [action, setAction] = useState<TaskAction>('add');

  const handleError = (e: unknown): void => {
    if (typeof e === 'string') {
      setErrorMessage(e);
      setFormInvalid(true);
    } else if (e instanceof Error) {
      setErrorMessage(e.message);
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
      setTasks(tasksFetched);
    } catch (e) {
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
    } catch (e) {
      handleError(e);
    }

    return false;
  };

  const submitEditTask = async (payload: TaskResponse): Promise<boolean> => {
    try {
      await api.patchJSON(`${ApiConfig.tasksUrl}/${payload.id}`, payload);
      loadTasks();
      return true;
    } catch (e) {
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
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setFormInvalid(true);
      setErrorMessage('Please fill all fields');
      return;
    }

    setFormInvalid(false);

    if (action === 'add') {
      const added: boolean = await addTask(form.description.value, form.url.value);
      if (added) {
        form.reset();
        resetInputs();
      }
    } else if (action === 'edit') {
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
    } catch (e) {
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
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>Add task</Card.Title>

              {formInvalid ? (
                <Alert variant="danger">
                  { errorMessage }
                </Alert>
              ) : null}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="test"
                    name="description"
                    placeholder="Enter description"
                    value={taskDescription}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTaskDescription(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-url">
                  <Form.Label>Additional URL</Form.Label>
                  <Form.Control
                    required={false}
                    type="text"
                    name="url"
                    placeholder="Additional URL (Optional)"
                    value={taskUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTaskUrl(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  Save
                </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th scope="col" style={{ width: '5%' }}>#</th>
                <th scope="col" style={{ width: '50%' }}>Description</th>
                <th scope="col" style={{ width: '10%' }}>Done</th>
                <th scope="col" style={{ width: '10%' }}>URL</th>
                <th scope="col" style={{ width: '25%' }}>Actions</th>
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
                  <td className={task.done ? 'text-done' : ''}>{task.done ? 'Yes' : 'No'}</td>
                  <td className={task.done ? 'text-done' : ''}>
                    {task.urls.length > 0 ? (
                      <a href={`${task.urls[0].url}`}>Link</a>
                    ) : '-'}
                  </td>
                  <td className={task.done ? 'text-done' : ''}>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => markAsDone(task)}
                      className="btn-action"
                    >
                      {task.done ? 'Undone' : 'Done'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={() => editTask(task)}
                      className="btn-action"
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteTask(task.id)}
                      className="btn-action"
                    >
                      Delete
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
