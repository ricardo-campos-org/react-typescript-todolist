import React from 'react';
import { Bell, Check2Circle } from 'react-bootstrap-icons';
import './style.css';

interface Props {
  readonly title: string;
  readonly highPriority: boolean;
  readonly done: boolean;
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
      <span className="task-title-icon">
        {props.done
          ? (
              <Check2Circle />
            )
          : (
              <Bell />
            )}
        <span className={`${props.done ? 'text-strike' : ''} ms-2 poppins-semibold`}>
          {props.title}
        </span>
      </span>
    );
  }
  return (
    <span className="task-title-icon">
      {props.done && (
        <Check2Circle />
      )}
      <span className={`${props.done ? 'ms-2 text-strike' : ''} poppins-semibold`}>
        {props.title}
      </span>
    </span>
  );
}

export default TaskTitle;
