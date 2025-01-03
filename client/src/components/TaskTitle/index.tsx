import React from 'react';
import { Bell, Check2Circle } from 'react-bootstrap-icons';
import './style.css';

interface Props {
  title: string;
  highPriority: boolean;
  done: boolean;
}

function TaskTitle(props: Props): JSX.Element {
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
