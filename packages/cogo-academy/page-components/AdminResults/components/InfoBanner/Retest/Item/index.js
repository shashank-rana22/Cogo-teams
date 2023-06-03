import {
	SelectController,
	CheckboxGroupController,
	RadioGroupController,
	DateRangePickerController,
} from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const controlMapping = {
	radio         : RadioGroupController,
	checkboxgroup : CheckboxGroupController,
	select        : SelectController,
	'date-picker' : DateRangePickerController,
};

function Item(props) {
	const {
		type,
		control,
		label,
		error = {},
	} = props || {};

	const Element = controlMapping[type] || null;

	return (
		<div className={styles.element}>
			<div className={styles.label}>
				{label}
				<sup className={styles.sup}>*</sup>
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
