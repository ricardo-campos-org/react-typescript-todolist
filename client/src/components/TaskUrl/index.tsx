import React from 'react';
import { At } from 'react-bootstrap-icons';

interface Props {
  url: string;
}

function TaskUrl(props: Props): React.ReactNode {
  let displayUrl = props.url.substring(props.url.indexOf('://') + 3);
  if (displayUrl.includes('www.')) {
    displayUrl = displayUrl.substring(displayUrl.indexOf('wwww.') + 5);
  }
  const maxLength = 50;
  if (displayUrl.length > maxLength) {
    displayUrl = `${displayUrl.substring(0, maxLength)}...`;
  }

  return (
    <div className="d-block mt-1">
      <At />
      <span className="ms-2">
        <a href={props.url} rel="noreferrer">{displayUrl}</a>
      </span>
    </div>
  );
}

export default TaskUrl;
