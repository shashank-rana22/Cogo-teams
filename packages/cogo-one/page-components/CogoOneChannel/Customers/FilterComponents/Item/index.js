import React from 'react';

import { getFieldController } from '../../../../../utils/getFieldController';

import styles from './styles.module.css';

function Item(props) {
	const {
		controllerType = '',
		control,
		label,
		error = {},
	} = props || {};

	const Element = getFieldController(controllerType);

	if (!Element) {
		return null;
	}

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
				{error?.type && <div className={styles.error_text}>This is Required</div>}
			</div>
		</div>
	);
}

export default Item;
