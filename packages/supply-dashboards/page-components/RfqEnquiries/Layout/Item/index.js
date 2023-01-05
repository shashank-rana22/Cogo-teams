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

	const errorClass = error ? 'error' : null;

	const errorOriginal = getErrorMessage({
		errorClass,
		error,
		rules,
		label,
	});
	const Element = getElementController(type);

	const flex = ((span || 12) / 12) * 100 - 1;

	return (
		<div className={styles.element} style={{ width: `${flex}%`, padding: '4px' }}>
			<div style={{
				height: '16px', marginBottom: '6px', fontWeight: '600', fontSize: '13px',
			}}
			>
				{heading}
			</div>
			<h4 style={{
				height: '16px', marginBottom: '6px', fontWeight: '400', fontSize: '12px',
			}}
			>
				{label}
			</h4>
			<Element
				control={control}
				{...props}
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
