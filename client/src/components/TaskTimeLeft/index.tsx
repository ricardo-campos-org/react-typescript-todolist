import React from 'react';
import { CalendarCheck } from 'react-bootstrap-icons';

interface Props {
  text: string;
  done: boolean;
}

function TaskTimeLeft(props: Props): JSX.Element | null {
  if (props.done) {
    return null;
  }

  return (
    <div className="d-block">
      <CalendarCheck />
      <span className="ms-2 poppins-regular">
        {props.text}
      </span>
    </div>
  );
}

export default TaskTimeLeft;
