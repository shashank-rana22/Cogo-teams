import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const TWELVE = 12;
const HUNDRED = 100;
const ONE = 1;
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

	const flex = ((span || TWELVE) / TWELVE) * HUNDRED - ONE;

	return (
		<div className={styles.element} style={{ width: `${flex}%` }}>
			<h4 className={styles.item_label}>
				{label}
			</h4>
			<Element
				{...props}
				rules={rules}
				control={control}
			/>
			<p className={styles.error}>
				{errorOriginal}
			</p>
		</div>
	);
}

export default Item;
