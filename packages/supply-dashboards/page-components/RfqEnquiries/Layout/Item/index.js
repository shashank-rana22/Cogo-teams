import React from 'react';

import getElementController from '../getController';

import styles from './styles.module.css';

function Item(props) {
	const {
		type,
		control,
		span,
		label,
	} = props || {};
	const Element = getElementController(type);
	const flex = ((span || 12) / 12) * 100 - 1;

	return (
		<div className={styles.element} style={{ width: `${flex}%`, padding: '4px' }}>
			<h4 style={{
				height: '16px', marginBottom: '6px', fontWeight: '400', fontSize: '12px',
			}}
			>
				{label}
			</h4>
			<Element
				className={type === 'date_picker' ? styles.date : styles.item}
				control={control}
				{...props}
			/>
		</div>
	);
}

export default Item;
