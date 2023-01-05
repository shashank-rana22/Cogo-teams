import React from 'react';

import getElementController from '../getController';

import styles from './styles.module.css';

const getErrorMessage = (props) => {
	const {
		errorClass, error, rules, errorName, label,
	} = props;
	const errorMessage = [];

	if (errorClass) {
		if (rules?.required && error.type === 'required') {
			errorMessage.push(error?.message || `${errorName || label} is Required`);
		}
		if ((rules?.min || rules?.min === 0) && error.type === 'min') {
			errorMessage.push(
				`${errorName || label} cannot be less than ${rules.min}`,
			);
		}
		if (rules?.max && error.type === 'max') {
			errorMessage.push(
				`${errorName || label} cannot be greater than ${rules.max}`,
			);
		}
		if (rules?.minLength && error.type === 'minLength') {
			errorMessage.push(
				`${errorName || label} should be ${rules.minLength} character(s) long`,
			);
		}
		if (rules?.maxLength && error.type === 'maxLength') {
			errorMessage.push(
				`${errorName || label} should be less than ${rules.maxLength}`,
			);
		}
	}
	if (errorMessage.length) {
		return errorMessage.join(' ,');
	}
	return error?.message;
};

function Item(props) {
	const {
		type,
		control,
		span,
		label,
		error,
		heading,
		rules,
	} = props || {};

	const errorClass = error ? 'error' : null;

	const errorOriginal = getErrorMessage({
		errorClass,
		error,
		rules,
		label,
	});
	const Element = getElementController(type);


	const flex = ((span || 12) / 12) * 100 - 1;

	return (
		<div className={styles.element} style={{ width: `${flex}%`, padding: '4px' }}>
			<div style={{
				height: '16px', marginBottom: '6px', fontWeight: '600', fontSize: '13px',
			}}
			>
				{heading}
			</div>
			<h4 style={{
				height: '16px', marginBottom: '6px', fontWeight: '400', fontSize: '12px',
			}}
			>
				{label}
			</h4>
			<Element
				control={control}
				{...props}
				error={errorOriginal}
			/>
		</div>
	);
}

export default Item;
