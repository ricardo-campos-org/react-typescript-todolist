import React from 'react';
import './style.css';
import { Col, Row } from 'react-bootstrap';

interface Props {
  tag?: string;
  lastUpdate: string;
}

function TaskTag(props: Props): React.ReactNode {
  const tagText = props.tag ? `#${props.tag}` : '#untagged';

  return (
    <Row>
      <Col className="d-inline-block text-muted card-tag poppins-regular">
        {tagText}
      </Col>
      <Col className="d-inline-block card-tag ms-5 text-end poppins-regular">
        {props.lastUpdate}
      </Col>
    </Row>
  );
}

export default TaskTag;
