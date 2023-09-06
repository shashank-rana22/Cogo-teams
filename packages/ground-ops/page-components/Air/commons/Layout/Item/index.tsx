import { cl } from '@cogoport/components';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

function Item(props) {
	const {
		type,
		control,
		span,
		label,
		error,
		heading,
		rules,
	} = props || {};

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
		<div className={styles.element} style={{ width: `${flex}%`, padding: '4px' }}>
			<div
				className="heading"
				style={{
					height: '16px', marginBottom: '6px', fontWeight: '600', fontSize: '13px',
				}}
			>
				{heading}
			</div>
			<div className={cl`${styles.label} ${rules?.required ? styles.required_field : ''}`}>
				{label}
			</div>
			<Element
				{...props}
				control={control}
			/>
			<p style={{
				fontStyle     : 'normal',
				fontSize      : '12px',
				lineHeight    : '16px',
				letterSpacing : '0.02em',
				paddingLeft   : '4px',
				margin        : '0px',
				color         : '#cb6464',
			}}
			>
				{errorOriginal}

			</p>
		</div>
	);
}

export default Item;
