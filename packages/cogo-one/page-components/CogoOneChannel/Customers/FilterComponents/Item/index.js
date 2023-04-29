import { SelectController, CheckboxGroupController, RadioGroupController, InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function getElementController(type = '') {
	switch (type) {
		case 'radio':
			return RadioGroupController;

		case 'checkboxgroup':
			return CheckboxGroupController;
		case 'select':
			return SelectController;
		case 'input':
			return InputController;
		default:
			return null;
	}
}

function Item(props) {
	const {
		controllerType = '',
		control,
		label,
		error = {},
	} = props || {};

	const Element = getElementController(controllerType);

	return (
		<div className={styles.element}>
			<div className={styles.label}>
				{label}
			</div>
			<div className={styles.filters_types}>
				{Element && (
					<Element
						{...props}
						control={control}
						className={styles.field_controller}
					/>
				)}
				{error?.type && <div className={styles.error_text}>This is Required</div>}
			</div>
		</div>
	);
}

export default Item;
