import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

function Item({
	type,
	control,
	span,
	label,
	error,
	heading,
	rules,
	...props
}) {
	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
	});

	if (!type) {
		return null;
	}

	const Element = getElementController(type);

	const flex = ((span || 12) / 12) * 100 - 1;

	return (
		<div className={styles.element} style={{ width: `${flex}%` }}>
			<div className={styles.item_heading}>
				{heading}
			</div>
			<h4 className={styles.item_label}>
				{label}
			</h4>
			<Element
				{...props}
				control={control}
			/>
			<p className={styles.error}>
				{errorOriginal}
			</p>
		</div>
	);
}

export default Item;
