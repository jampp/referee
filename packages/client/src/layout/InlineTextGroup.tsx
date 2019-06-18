import { Form } from 'react-bootstrap';
import * as React from 'react';
import { FormGroup } from './FormGroup';

export const InlineTextGroup = ({
  onBlur = () => {},
  id,
  label,
  placeHolderText,
  value,
  disabled = false,
  onChange = () => {},
  touched = false,
  error = undefined
}: {
  id: string;
  label: string;
  placeHolderText?: string;
  value?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onChange?: (value: any) => void;
  touched?: boolean;
  error?: undefined | string;
}): JSX.Element => {
  return (
    <FormGroup id={id} label={label} touched={touched} error={error}>
      <Form.Control
        onBlur={() => {
          onBlur();
        }}
        disabled={disabled}
        autoComplete="off"
        type="text"
        value={value}
        placeholder={placeHolderText}
        onChange={onChange}
      />
    </FormGroup>
  );
};