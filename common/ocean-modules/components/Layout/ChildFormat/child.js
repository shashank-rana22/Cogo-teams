import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';
import getAsyncFields from '../Item/getAsyncKeys';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const EMPTY_SPAN = 0;
const ELEMENTS_INCR_BY = 1;
const INDEX_INCR_BY = 1;
const REMOVE_UPTO_INDEX = 1;
const PERCENT_FACTOR = 100;

const ASYNC_SELECT_TYPE = ['select', 'creatable-select', 'location-select'];

function Child({
	controls = [],
	control = {},
	index = '',
	name = '',
	remove = '',
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	field = {},
	disabled,
	error = {},
	formValues = {},
}) {
	const TOTAL_FIELDS = [];

	let rowWiseFields = [];
	let span = EMPTY_SPAN;

	controls.forEach((fields) => {
		span += fields.span || DEFAULT_SPAN;
		if (span === DEFAULT_SPAN) {
			rowWiseFields.push(fields);
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			span = EMPTY_SPAN;
		} else if (span < DEFAULT_SPAN) {
			rowWiseFields.push(fields);
		} else {
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			rowWiseFields.push(fields);
			span = fields.span;
		}
	});

	if (rowWiseFields.length) {
		TOTAL_FIELDS.push(rowWiseFields);
	}

	const keysForFields = useMemo(
		() => Array(TOTAL_FIELDS.length).fill(null).map(() => Math.random()),
		[TOTAL_FIELDS.length],
	);

	if (formValues?.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.fileName === ''
	|| formValues?.documents_commercial_invoice?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.fileName === ''
	|| formValues?.documents_packing_list?.[GLOBAL_CONSTANTS.zeroth_index]?.url?.fileName === '') {
		const elements = document.querySelectorAll('.ui_upload_filesuccess_container');

		for (let i = 0; i < elements.length; i += ELEMENTS_INCR_BY) {
			elements[i].style.display = 'none';
		}
	}

	const getNewControls = (item = {}) => {
		let newProps = { ...item };

		const { type } = item;
		const isAsyncSelect = ASYNC_SELECT_TYPE.includes(type)
		&& Object.keys(item).includes('optionsListKey');

		if (isAsyncSelect) {
			const asyncKey = item?.optionsListKey;

			const asyncFields = getAsyncFields(asyncKey) || {};

			const finalParams = item?.params || asyncFields?.defaultParams;

			if (Object.keys(asyncFields)?.includes('defaultParams')) { delete asyncFields?.defaultParams; }

			newProps = {
				...newProps,
				...asyncFields,
				params : finalParams,
				type   : 'async-select',
			};
			return newProps;
		}

		return newProps;
	};

	return (
		<fieldset className={styles.fieldarray} key={field.id}>
			<legend className={styles.heading}>
				{startCase(name)}
				&nbsp;
				{index + INDEX_INCR_BY}
			</legend>
			{TOTAL_FIELDS.map((rowFields, i) => (
				<div className={styles.row} key={keysForFields[i]}>
					{rowFields.map((controlItem) => {
						const newControl = getNewControls(controlItem);

						const Element = getElementController(newControl.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
						});

						const show = 'show' in controlItem ? controlItem.show : true;

						const EXTRA_PROPS = {};
						if (controlItem.customProps?.options) {
							EXTRA_PROPS.options = controlItem.customProps.options[index];
						}
						const disable = index < noDeleteButtonTill && controlItem.name === 'code';
						const flex = ((controlItem?.span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR;
						if (!Element || !show) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={controlItem.name}>
								<h4 className={styles.label}>
									{controlItem?.label}
								</h4>
								<Element
									{...newControl}
									{...EXTRA_PROPS}
									style={{ minWidth: '0px' }}
									key={`${name}.${index}.${controlItem.name}`}
									name={`${name}.${index}.${controlItem.name}`}
									index={index}
									control={control}
									size="sm"
									disabled={disabled || disable}
								/>
								<p className={styles.errors}>
									{errorOriginal}
								</p>
							</div>
						);
					})}

				</div>
			))}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<div className={styles.delete_icon}>
					<IcMDelete
						className={styles.icon}
						onClick={() => remove(index, REMOVE_UPTO_INDEX)}
					/>
				</div>
			) : null}
		</fieldset>
	);
}
export default Child;
