import React from 'react';
import { Bell, Check2Circle } from 'react-bootstrap-icons';
import ExternalLinkIcon from '../../assets/icons8-external-link-30.png';
import './style.css';

interface Props {
  readonly title: string;
  readonly highPriority: boolean;
  readonly done: boolean;
  readonly taskUrl: string[];
}

/**
 * Renders the TaskTitle component, displaying an icon and the task title.
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.title] - The title for the task.
 * @param {boolean} [props.highPriority] - Define if the task is high priority.
 * @param {boolean} [props.done] - Define if the task is completed.
 * @returns {React.ReactNode} The rendered TaskTitle component.
 */
function TaskTitle(props: React.PropsWithChildren<Props>): React.ReactNode {
  if (props.highPriority) {
    return (
      <span className="task-title-icon" data-testid={`task-title-container-${props.title}`}>
        {props.done
          ? (
              <Check2Circle data-testid={`task-title-check-${props.title}`} />
            )
          : (
              <Bell data-testid={`task-title-bell-${props.title}`} />
            )}
        <span
          className={`${props.done ? 'text-strike' : ''} ms-2 poppins-semibold`}
          data-testid={`task-title-text-${props.title}`}
        >
          {props.title}
          {props.taskUrl && props.taskUrl.length > 0 && (
            <a href={props.taskUrl[0]} target="_blank" rel="noreferrer" className="task-note-external-link">
              <img src={ExternalLinkIcon} width={20} alt="external link" />
            </a>
          )}
        </span>
      </span>
    );
  }
  return (
    <span className="task-title-icon" data-testid={`task-title-container-${props.title}`}>
      {props.done && (
        <Check2Circle data-testid={`task-title-check-${props.title}`} />
      )}
      <span
        className={`${props.done ? 'ms-2 text-strike' : ''} poppins-semibold`}
        data-testid={`task-title-text-${props.title}`}
      >
        {props.title}
        {props.taskUrl && props.taskUrl.length > 0 && (
          <a href={props.taskUrl[0]} target="_blank" rel="noreferrer" className="task-note-external-link">
            <img src={ExternalLinkIcon} width={20} alt="external link" />
          </a>
        )}
      </span>
    </span>
  );
}

export default TaskTitle;
