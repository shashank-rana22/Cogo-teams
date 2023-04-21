import { cl } from '@cogoport/components';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import getAsyncFields from './getAsyncKeys';
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
		className,
	} = props || {};

	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
	});

	let newProps = { ...props };

	const isAsyncSelect = ['select', 'creatable-select'].includes(type)
		&& Object.keys(props).includes('optionsListKey');

	if (isAsyncSelect) {
		const asyncKey = props?.optionsListKey;

		const asyncFields = getAsyncFields(asyncKey) || {};
		const finalParams = props?.params || asyncFields?.defaultParams;

		if (Object.keys(asyncFields).includes('defaultParams')) { delete asyncFields.defaultParams; }

		newProps = {
			...newProps,
			...asyncFields,
			params : finalParams,
			type   : 'async-select',
		};
	}

	const Element = getElementController(newProps.type);

	const flex = ((span || 12) / 12) * 100 - 1;

	return (
		<div className={cl`${styles.element} ${className}`} style={{ width: `${flex}%` }}>
			{heading ? (<div className={styles.heading}>{heading}</div>) : null}

			{label ? (<h4 className={styles.label}>{label}</h4>) : null}

			<Element
				size={type === 'pills' ? 'md' : 'sm'} // need to put in config
				{...newProps}
				control={control}

			/>
			<p className={styles.errors}>{errorOriginal}</p>
		</div>
	);
}

export default Item;
