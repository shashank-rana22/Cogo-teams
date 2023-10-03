import { cl } from '@cogoport/components';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

interface ItemInterface {
	type?:string
	span?:number
	label?:string
	error?:object
	heading?:string
	rules?:object | any
	control?:object
}

function Item({
	type,
	control,
	span,
	label,
	error,
	heading,
	rules,
	...props
}:ItemInterface) {
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
			<h4 className={cl`${styles.item_label} ${rules?.required ? styles.required_field : ''}`}>
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
