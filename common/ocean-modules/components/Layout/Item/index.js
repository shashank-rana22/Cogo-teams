import { cl } from '@cogoport/components';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';
import getNewControls from '../helpers/getNewControls';

import styles from './styles.module.css';

function Item(props) {
	const {
		type = '',
		control,
		label = '',
		error = {},
		rules = {},
		className = '',
		formValues = {},
		source = '',
		flex = '49%',
		disabled = false,
		options = [],
		value,
	} = props || {};

	const errorOriginal = getErrorMessage({
		error,
		rules,
		label,
	});

	const newProps = getNewControls(props);

	if (!newProps.type && !newProps.showOnlyLabel) return null;

	const Element = getElementController(newProps.type);

	if (formValues?.booking_reference_proof?.fileName === '') {
		const element = document.querySelector('.ui_upload_filesuccess_container');
		element.style.display = 'none';
	}

	const pillOptions = options || [];
	if (type === 'pills' && disabled && value) {
		pillOptions.forEach((i, idx) => { pillOptions[idx].disabled = true; });
	}

	return (
		<div className={cl`${styles.element} ${className}`} style={{ width: flex }}>

			{label && source !== 'edit_line_items' ? (<h4 className={styles.label}>{label}</h4>) : null}

			{Element ? (
				<Element
					size={type === 'pills' ? 'md' : 'sm'} // need to put in config
					{...newProps}
					{...(type === 'pills' && { options: pillOptions })}
					control={control}
				/>
			) : null}

			<p className={styles.errors}>{errorOriginal}</p>
		</div>
	);
}

export default Item;
