import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../getController';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	index,
	name,
	field,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
	register,
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
		<div className={styles.fieldarray}>
			{totalFields.map((fields) => (
				<div className={styles.row}>
					{fields.map((controlItem) => {
						const Element = getElementController(controlItem.type);
						const extraProps = {};
						if (controlItem.customProps) {
							if (Array.isArray(controlItem.customProps)) {
								extraProps.options = controlItem.customProps;
							} else {
								extraProps.options = controlItem.customProps[index];
							}
						}
						const flex = ((controlItem?.span || 12) / 12) * 100;
						if (!Element) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }}>
								<h4 style={{
									height: '16px', marginBottom: '6px', fontWeight: '400', fontSize: '12px',
								}}
								>
									{controlItem?.label}
								</h4>
								<Element
									style={{ minWidth: '0px' }}
									key={`${name}.${index}.${controlItem.name}`}
									options={extraProps?.options}
									index={index}
									control={control}
									{...controlItem}
									{...register(`${name}.${index}.${controlItem.name}`)}
								/>
							</div>
						);
					})}
					<div style={{ width: '2em', marginTop: '24px' }}>
						{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
							<IcMDelete
								className={`form-fieldArray-${name}-remove`}
								onClick={() => remove(index, 1)}
								style={{
									width: '2em', height: '2em', marginTop: '8px', cursor: 'pointer',
								}}
							/>
						) : null}

					</div>
				</div>
			))}
		</div>
	);
}
export default Child;
