import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

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
	field,
	disabled,
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
				<div key={fields[0]?.name} className={styles.row}>
					{fields.map((controlItem) => {
						const Element = getElementController(controlItem.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
						});
						const extraProps = {};
						if (controlItem.customProps?.options) {
							extraProps.options = controlItem.customProps.options[index];
						}
						if (controlItem.customProps?.disabled) {
							extraProps.disabled = controlItem.customProps.disabled[index];
						}
						const disable = (index < noDeleteButtonTill
							&& controlItem.name === 'code') || controlItem.disabled;
						const flex = ((controlItem?.span || 12) / 12) * 100;
						if (controlItem.type === 'static') {
							return controlItem.render();
						}
						if (!Element) return null;
						return (
							<div key={controlItem.name} className={styles.element} style={{ width: `${flex}%` }}>
								<div
									style={{
										height       : '16px',
										marginBottom : '6px',
										fontWeight   : '400',
										fontSize     : '12px',
										display      : 'flex',
										alignItems   : 'center',
									}}
								>
									{controlItem?.label}
								</div>
								<Element
									{...controlItem}
									style={{ minWidth: '0px' }}
									key={`${name}.${index}.${controlItem.name}`}
									name={`${name}.${index}.${controlItem.name}`}
									index={index}
									control={control}
									disabled={disabled || disable}
									{...extraProps}
								/>
								<div style={{
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
								</div>
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
