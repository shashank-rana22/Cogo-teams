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
	const flex = ((span || 12) / 12) * 100;

	return (
		<div className={styles.element} style={{ width: `${flex}%`, padding: '4px' }}>
			<h4 style={{ height: '16px', marginBottom: '6px' }}>
				{label}
			</h4>
			<Element
				control={control}
				{...props}
				style={{ minWidth: '0px' }}
			/>
		</div>
	);
}

export default Item;
