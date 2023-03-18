import { cl } from '@cogoport/components';
import { SelectController, CheckboxGroupController, RadioGroupController, CheckboxController } from '@cogoport/forms';
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
		case 'checkbox':
			return CheckboxController;
		default:
			return null;
	}
}

function Item(props) {
	const {
		type,
		control,
		label,
		botToggle = false,
		error = {},
	} = props || {};

	const Element = getElementController(type);

	return (
		<div className={styles.element}>
			<div className={styles.label}>
				{label}
			</div>
			<div className={cl`${styles.filters_types} ${botToggle ? styles.disabled : ''}`}>
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
