import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';
import getAsyncFields from '../Item/getAsyncKeys';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
const FLEX_HUNDRED = 100;
const INCREMENT_BY_ONE = 1;
const ZEROTH_SPAN = 0;

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
	let ROW_WISE_FIELDS = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	controls.forEach((fields) => {
		if ((span + fields.span) > TOTAL_SPAN) {
			TOTAL_FIELDS.push(ROW_WISE_FIELDS);
			ROW_WISE_FIELDS = [];
			ROW_WISE_FIELDS.push(fields);
			span = fields.span;
		} else {
			ROW_WISE_FIELDS.push(fields);
			span += fields.span;
		}
	});
	if (ROW_WISE_FIELDS.length) {
		TOTAL_FIELDS.push(ROW_WISE_FIELDS);
	}

	if (formValues?.documents?.[ZEROTH_SPAN]?.url?.fileName === ''
	|| formValues?.documents_commercial_invoice?.[ZEROTH_SPAN]?.url?.fileName === ''
	|| formValues?.documents_packing_list?.[ZEROTH_SPAN]?.url?.fileName === '') {
		const elements = document.querySelectorAll('.ui_upload_filesuccess_container');
		for (let i = 0; i < elements.length; i += INCREMENT_BY_ONE) {
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
				{index + INCREMENT_BY_ONE}
			</h3>
			{Object.keys(TOTAL_FIELDS).map((rowFields) => (
				<div className={styles.row} key={rowFields}>
					{TOTAL_FIELDS[rowFields].map((controlItem) => {
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
						const flex = ((controlItem?.span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED;
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
			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<div className={styles.delete_icon}>
					<IcMDelete
						className={styles.icon}
						onClick={() => remove(index, NO_OF_ELEMENTS_TO_BE_REMOVED)}
					/>
				</div>
			) : null}
		</div>
	);
}
export default Child;
