import React, { useEffect, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';

type IconName = keyof typeof Icons;

interface Props {
  labelText: string;
  iconName: IconName;
  required: boolean;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormInput(props: React.PropsWithChildren<Props>) {
  const [showingPwd, setShowingPwd] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>(props.type ? props.type : 'text');
  const Icon = Icons[props.iconName];

  const toggleShowPassword = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('clicked to show password');
    setShowingPwd((prevValue: boolean) => !prevValue);
    setFormType((previous: string) => previous === 'text' ? 'password' : 'text');
  };

  useEffect(() => {}, [showingPwd, formType]);

  return (
    <Row>
      <Col>
        <Form.Group className="mb-3" controlId={`form-input-${props.name}`}>
          <Form.Label>
            {props.labelText}
            {props.type && props.type === 'password' && (
              <small>
                <a href="#" onClick={toggleShowPassword}>
                  {showingPwd ? ' (Hide)' : ' (Show)'}
                </a>
              </small>
            )}
          </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <Icon />
            </InputGroup.Text>
            <Form.Control
              required={props.required}
              type={formType}
              name={props.name}
              placeholder={props.placeholder ? props.placeholder : ''}
              value={props.value}
              onChange={props.onChange}
            />
          </InputGroup>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default FormInput;
