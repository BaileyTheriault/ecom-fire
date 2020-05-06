import React from 'react';

import {
  GroupContainer,
  FormContainer,
  FormInputLabel,
} from './form-input.styles.jsx';

const FormInput = ({ handleChange, label, ...props }) => (
  <GroupContainer>
    <FormContainer onChange={handleChange} {...props} />
    {label ? (
      <FormInputLabel className={props.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
