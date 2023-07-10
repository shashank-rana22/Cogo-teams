import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';
import getAsyncFields from '../Item/getAsyncKeys';

import styles from './styles.module.css';

const ZERO_INDEX = 0;
const FIRST_INDEX = 1;
const TOTAL_SPAN = 12;
const SPAN_CONVERTIABLE_FACTOR = 100;

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
	id = '',
	length,
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	controls.forEach((fields) => {
		span += fields.span || TOTAL_SPAN;
		if (span === TOTAL_SPAN) {
			rowWiseFields.push(fields);
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			span = ZERO_INDEX;
		} else if (span < TOTAL_SPAN) {
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

	if (formValues?.documents?.[ZERO_INDEX]?.url?.fileName === ''
	|| formValues?.documents_commercial_invoice?.[ZERO_INDEX]?.url?.fileName === ''
	|| formValues?.documents_packing_list?.[ZERO_INDEX]?.url?.fileName === '') {
		const elements = document.querySelectorAll('.ui_upload_filesuccess_container');
		for (let i = 0; i < elements.length; i += FIRST_INDEX) {
			elements[i].style.display = 'none';
		}
	}

	const getNewControls = (item = {}) => {
		let newProps = { ...item };

		const { type } = item;
		const isAsyncSelect = ['select', 'creatable-select', 'location-select'].includes(type)
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
		<div className={styles.fieldarray} key={field.id}>
			<h3 className={styles.heading}>
				{startCase(name || 'document')}
				&nbsp;
				{index + FIRST_INDEX}
			</h3>
			{TOTAL_FIELDS.map((rowFields, i) => (
				<div className={styles.row} key={keysForFields[i]}>
					{rowFields.map((controlItem) => {
						const newControl = getNewControls(controlItem);

						if (!newControl.type && !newControl.showOnlyLabel) return null;

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
						const flex = ((controlItem?.span || TOTAL_SPAN) / TOTAL_SPAN) * SPAN_CONVERTIABLE_FACTOR;

						if ((!Element || !show) && (!newControl.showOnlyLabel)) return null;

						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={controlItem.name}>
								<h4 className={styles.label}>
									{controlItem?.label}
								</h4>

								{Element
									? 								 (
										<Element
											{...newControl}
											{...EXTRA_PROPS}
											style={{ minWidth: '0px' }}
											key={`${name}.${index}.${controlItem.name}`}
											name={`${name}.${index}.${controlItem.name}`}
											index={index}
											control={control}
											size="sm"
											disabled={newControl?.disabled ?? (disabled || disable)}
											id={id}
										/>
									)
									: null}

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
					})}

				</div>
			))}
			{showDeleteButton && index >= noDeleteButtonTill && !disabled && length > FIRST_INDEX ? (
				<div className={styles.delete_icon}>
					<IcMDelete
						className={styles.icon}
						onClick={() => remove(index, FIRST_INDEX)}
					/>
				</div>
			) : null}
		</div>
	);
}
export default Child;
