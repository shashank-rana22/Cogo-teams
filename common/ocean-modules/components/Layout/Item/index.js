import { cl } from '@cogoport/components';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import getAsyncFields from './getAsyncKeys';
import styles from './styles.module.css';

const ASYNC_SELECT = ['select', 'creatable-select', 'location-select'];
const DEFAULT_SPAN = 12;
const FLEX_OFFSET = 1;
const PERCENT_FACTOR = 100;

function Item(props) {
	const {
		type = '',
		control,
		span,
		label = '',
		error = {},
		rules = {},
		className = '',
		formValues = {},
		source = '',
	} = props || {};

	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
	});

	let newProps = { ...props };

	const isAsyncSelect = ASYNC_SELECT.includes(type) && Object.keys(props).includes('optionsListKey');

	if (isAsyncSelect) {
		const asyncKey = props?.optionsListKey;

		const asyncFields = getAsyncFields(asyncKey) || {};

		const finalParams = props?.params || asyncFields?.defaultParams;

		if (Object.keys(asyncFields)?.includes('defaultParams')) { delete asyncFields?.defaultParams; }

		newProps = {
			...newProps,
			...asyncFields,
			params : finalParams,
			type   : 'async-select',
		};
	}

	if (!newProps.type && !newProps.showOnlyLabel) return null;

	const Element = getElementController(newProps.type);

	const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;

	if (formValues?.booking_reference_proof?.fileName === '') {
		const element = document.querySelector('.ui_upload_filesuccess_container');
		element.style.display = 'none';
	}

	return (
		<div className={cl`${styles.element} ${className}`} style={{ width: `${flex}%` }}>

			{label && source !== 'edit_line_items' ? (<h4 className={styles.label}>{label}</h4>) : null}

			{Element
				? (
					<Element
						size={type === 'pills' ? 'md' : 'sm'} // need to put in config
						{...newProps}
						control={control}
					/>
				) : null}

			<p className={styles.errors}>{errorOriginal}</p>
		</div>
	);
}

export default Item;
