import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';
import getAsyncFields from '../Item/getAsyncKeys';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	field,
	disabled,
	error,
	formValues,
}) {
	let rowWiseFields = [];
	const totalFields = [];
	let span = 0;
	controls.forEach((fields) => {
		span += fields.span || 12;
		if (span === 12) {
			rowWiseFields.push(fields);
			totalFields.push(rowWiseFields);
			rowWiseFields = [];
			span = 0;
		} else if (span < 12) {
			rowWiseFields.push(fields);
		} else {
			totalFields.push(rowWiseFields);
			rowWiseFields = [];
			rowWiseFields.push(fields);
			span = fields.span;
		}
	});
	if (rowWiseFields.length) {
		totalFields.push(rowWiseFields);
	}

	if (formValues?.documents?.[0]?.url?.fileName === ''
	|| formValues?.documents_commercial_invoice?.[0]?.url?.fileName === ''
	|| formValues?.documents_packing_list?.[0]?.url?.fileName === '') {
		const elements = document.querySelectorAll('.ui_upload_filesuccess_container');
		for (let i = 0; i < elements.length; i += 1) {
			elements[i].style.display = 'none';
		}
	}

	const getNewControls = (item = {}) => {
		let newProps = { ...item };

		const { type } = item;
		const isAsyncSelect = ['select', 'creatable-select'].includes(type)
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
				Document
				&nbsp;
				{index + 1}
			</h3>
			{totalFields.map((rowFields) => (
				<div className={styles.row}>
					{rowFields.map((controlItem) => {
						const newControl = getNewControls(controlItem);

						const Element = getElementController(newControl.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
						});

						const show = 'show' in controlItem ? controlItem.show : true;

						const extraProps = {};
						if (controlItem.customProps?.options) {
							extraProps.options = controlItem.customProps.options[index];
						}
						const disable = index < noDeleteButtonTill && controlItem.name === 'code';
						const flex = ((controlItem?.span || 12) / 12) * 100;
						if (!Element || !show) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }}>
								<h4 className={styles.label}>
									{controlItem?.label}
								</h4>
								<Element
									{...newControl}
									{...extraProps}
									style={{ minWidth: '0px' }}
									key={`${name}.${index}.${controlItem.name}`}
									name={`${name}.${index}.${controlItem.name}`}
									index={index}
									control={control}
									size="sm"
									disabled={disabled || disable}
									size="sm"
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
					})}

				</div>
			))}
			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<div className={styles.delete_icon}>
					<hr />
					<IcMDelete
						className={styles.icon}
						onClick={() => remove(index, 1)}
					/>
				</div>
			) : null}
		</div>
	);
}
export default Child;
