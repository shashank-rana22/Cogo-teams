import { useTranslation } from 'next-i18next';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 1;

function Item({
	type = '',
	control = {},
	span = 1,
	label = '',
	error = {},
	heading = '',
	rules = {},
	...props
}) {
	const { t } = useTranslation(['airRepository']);
	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
		t,
	});

	if (!type) {
		return null;
	}

	const Element = getElementController(type);

	const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

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
