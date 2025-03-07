import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Markdown from 'react-markdown';
import './style.css';

interface Props {
  show: boolean;
  title: string;
  markdownText: string;
  onHide: () => void;
}

function ModalMarkdown(props: React.PropsWithChildren<Props>): React.ReactNode {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="markdown-modal-content"
    >
      <Modal.Header closeButton>
        <Modal.Title id="markdown-modal-content">
          {props.title === '' ? 'No title' : props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="markdown-modal">
        <Markdown>{props.markdownText}</Markdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMarkdown;
