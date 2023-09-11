import { cl } from '@cogoport/components';
import React from 'react';

import CONSTANTS from '../../../constants/CONSTANTS';
import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_ONE, FLEX_HUNDRED } = CONSTANTS;

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

	const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

	return (
		<div className={styles.element} style={{ width: `${flex}%` }}>
			<div className={styles.item_heading}>
				{heading}
			</div>
			<div className={cl`${styles.item_label} ${rules?.required ? styles.required_field : ''}`}>
				{label}
			</div>
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
