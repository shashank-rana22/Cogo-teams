import CheckboxGroupController from '@cogoport/forms/page-components/Controlled/CheckboxGroupController';
import RadioGroupController from '@cogoport/forms/page-components/Controlled/RadioGroupController';
import React from 'react';

import styles from './styles.module.css';

function getElementController(type = '') {
	switch (type) {
		case 'radio':
			return RadioGroupController;

		case 'checkboxgroup':
			return CheckboxGroupController;

		default:
			return null;
	}
}

function Item(props) {
	const {
		type,
		control,
		label,
	} = props || {};

	const Element = getElementController(type);

	return (
		<div className={styles.element}>
			<div className={styles.label}>
				{label}
			</div>
			<div className={styles.filters_types}>
				<Element
					{...props}
					control={control}
					className={styles.field_controller}
				/>
			</div>
		</div>
	);
}

export default Item;
