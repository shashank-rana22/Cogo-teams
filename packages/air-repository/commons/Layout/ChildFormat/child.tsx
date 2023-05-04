import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { NestedObj } from '../../List/Interfaces';
import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

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
	const totalFields = [];
	let span = 0;
	controls.forEach((fields) => {
		span += fields.span || 11;
		if (span === 11) {
			rowWiseFields.push(fields);
			totalFields.push(rowWiseFields);
			rowWiseFields = [];
			span = 0;
		} else if (span < 11) {
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

	return (
		<div className={styles.fieldarray} key={field.id}>
			{totalFields.map((fields) => (
				<div className={styles.row}>
					{fields.map((controlItem) => {
						const Element = getElementController(controlItem.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
						});
						const extraProps:NestedObj = {};
						if (controlItem.customProps?.options) {
							extraProps.options = controlItem.customProps.options[index];
						}
						const flex = ((controlItem?.span || 12) / 12) * 100 - 1;
						if (!Element) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }}>
								<h4 className={styles.child_label}>
									{controlItem?.label}
								</h4>
								<Element
									{...controlItem}
									{...extraProps}
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
					<div style={{ width: '2em', marginTop: '24px' }}>
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
