import React from 'react';

import "./form-input.styles.scss";

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className="group">
        <input className='form-input' label={label} onChange={handleChange} {...otherProps}></input>
        {
            label ? // If label prop exist, draw label element
                (
                    <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                        {label}
                    </label>
                )
                : null // If not dont draw anything
        }
    </div>
);

export default FormInput;