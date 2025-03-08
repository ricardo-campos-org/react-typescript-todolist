import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';

type Props = {
  errorMessage?: string;
};

/**
 * Renders an AlertError message banner.
 *
 * @param {Props} props the AlertError props with the message to be displayed.
 * @param {string} [props.errorMessage] Optional error message.
 * @returns {React.ReactNode} the AlertError rendered component.
 */
const AlertError: React.FC<Props> = (props: Props): React.ReactNode => {
  return props.errorMessage && props.errorMessage.length > 0
    ? (
        <Row className="main-margin">
          <Col xs={12}>
            <Alert variant="danger">
              { props.errorMessage }
            </Alert>
          </Col>
        </Row>
      )
    : null;
};

export default AlertError;
