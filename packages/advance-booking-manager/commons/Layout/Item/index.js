import { cl } from '@cogoport/components';
import React from 'react';

import CONSTANTS from '../../../constants/constants';
import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_ONE, FLEX_HUNDRED } = CONSTANTS;

function Item({
	type = '',
	control = {},
	span = 1,
	label = '',
	error = '',
	heading = '',
	rules = {},
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
			<div className={cl`${styles.item_heading} heading_ui`}>
				{heading}
			</div>
			{type === 'checkbox' ? (
				<div className={styles.item_flex}>
					<Element
						{...props}
						rules={rules}
						control={control}
					/>
					<div className={cl`${styles.item_label} ${rules?.required ? styles.required_field : ''}`}>
						{label}
					</div>

				</div>
			) : (
				<>
					<div className={cl`${styles.item_label} ${rules?.required ? styles.required_field : ''}`}>
						{label}
					</div>
					<Element
						{...props}
						rules={rules}
						control={control}
						className="element_ui"
					/>
				</>
			)}
			<p className={styles.error}>
				{errorOriginal}
			</p>
		</div>
	);
}

export default Item;
