import React, { useEffect, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import { MiddlewareReturn } from '@floating-ui/core';
import { MiddlewareState } from '@floating-ui/dom';

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
  data_testid?: string;
}

/**
 * FormInput component renders a form input with a label, icon, and optional password toggle.
 *
 * @param {Props} props - The properties for the FormInput component.
 * @param {string} props.labelText - The text for the form label.
 * @param {IconName} props.iconName - The name of the icon to display.
 * @param {boolean} props.required - Whether the input is required.
 * @param {string} [props.type] - The type of the input (e.g., 'text', 'password').
 * @param {string} props.name - The name of the input.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {string} props.value - The value of the input.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) void} props.onChange - The change event handler for the input.
 * @returns {React.ReactNode} The rendered FormInput component.
 */
function FormInput(props: React.PropsWithChildren<Props>): React.ReactNode {
  const [showingPwd, setShowingPwd] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>(props.type ? props.type : 'text');
  const Icon = Icons[props.iconName];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  /**
   * Toggle the password visibility.
   *
   * @param {React.MouseEvent<Element, MouseEvent>} e the click event.
   */
  const toggleShowPassword = (e: React.MouseEvent<Element, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();

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
            {props.name === 'tag' && (
              <small className="text-muted">
                {' '}
                Comma or space separated
              </small>
            )}
          </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <Icon />
            </InputGroup.Text>
            {props.type == 'date'
              ? (
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                    id="date-input"
                    popperPlacement="bottom"
                    popperModifiers={[
                      {
                        name: 'preventOverflow',
                        options: {
                          enabled: true,
                          boundariesElement: 'viewport'
                        },
                        fn: function (state: MiddlewareState): MiddlewareReturn | Promise<MiddlewareReturn> {
                          return state;
                        }
                      }
                    ]}
                    // Mobile-friendly options
                    withPortal
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                )
              : (
                  <Form.Control
                    required={props.required}
                    type={formType}
                    name={props.name}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    value={props.value}
                    onChange={props.onChange}
                    data-testid={props.data_testid}
                  />
                )}
          </InputGroup>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default FormInput;
