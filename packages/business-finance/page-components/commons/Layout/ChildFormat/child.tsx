import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

export interface NestedObj {
	[key: string]: string;
}

function Child({
	controls,
	control,
	index,
	name,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
	field,
	error,
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	controls.forEach((fields) => {
		span += fields.span || 12;
		if (span === 12) {
			rowWiseFields.push(fields);
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			span = 0;
		} else if (span < 12) {
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

	const totalFieldsObject = { ...TOTAL_FIELDS };

	return (
		<div className={styles.fieldarray} key={field.id}>
			{Object.keys(totalFieldsObject).map((key) => (
				<div className={styles.row} key={key}>
					{totalFieldsObject[key].map((controlItem) => {
						const Element = getElementController(controlItem.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
						});
						const EXTRA_PROPS:NestedObj = {};
						if (controlItem.customProps?.options) {
							EXTRA_PROPS.options = controlItem.customProps.options[index];
						}
						const flex = ((controlItem?.span || 12) / 12) * 100 - 1;
						if (!Element) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={controlItem.name}>
								<h4 className={styles.child_label}>
									{controlItem?.label}
								</h4>
								<Element
									{...controlItem}
									{...EXTRA_PROPS}
									style={{ minWidth: '0px' }}
									key={`${name}.${index}.${controlItem.name}`}
									name={`${name}.${index}.${controlItem.name}`}
									index={index}
									control={control}

								/>
								<p
									className={styles.font_style}
								>
									{errorOriginal}
								</p>
							</div>
						);
					})}
					<div className={styles.icon_delete}>
						{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
							<IcMDelete
								className={`form-fieldArray-${name}-remove ${styles.delete_icon}`}
								onClick={() => remove(index, 1)}
							/>
						) : null}
					</div>
				</div>
			))}
		</div>
	);
}
export default Child;
