import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../getController';

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
}) {
	let rowWiseFields = [];
	const totalFields = [];
	let span = 0;
	controls.forEach((field) => {
		span += field.span || 11;
		if (span === 11) {
			rowWiseFields.push(field);
			totalFields.push(rowWiseFields);
			rowWiseFields = [];
			span = 0;
		} else if (span < 11) {
			rowWiseFields.push(field);
		} else {
			totalFields.push(rowWiseFields);
			rowWiseFields = [];
			rowWiseFields.push(field);
			span = field.span;
		}
	});
	if (rowWiseFields.length) {
		totalFields.push(rowWiseFields);
	}
	return (
		<div className={styles.fieldarray}>
			{totalFields.map((field) => (
				<div className={styles.row}>
					{field.map((controlItem) => {
						const Element = getElementController(controlItem.type);
						const flex = ((controlItem?.span || 12) / 12) * 100;
						if (!Element) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }}>
								<h4 style={{ height: '16px', marginBottom: '6px' }}>
									{controlItem?.label}
								</h4>
								<Element
									style={{ minWidth: '0px' }}
									control={control}
									{...controlItem}
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
