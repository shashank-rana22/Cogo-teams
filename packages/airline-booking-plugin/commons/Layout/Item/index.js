import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
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
	error = {},
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
