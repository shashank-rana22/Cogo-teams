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

		const asyncFields = getAsyncFields(asyncKey);
		const finalParams = props?.params || asyncFields?.defaultParams;

		if (Object.keys(asyncFields).includes('defaultParams')) {
			delete asyncFields.defaultParams;
		}

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
				{...newProps}
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
