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
	showElements = {},
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

	return (
		<div className={styles.fieldarray} key={field.id}>
			{totalFields.map((rowFields) => (
				<div className={styles.row}>
					{rowFields.map((controlItem) => {
						const Element = getElementController(controlItem.type);

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
							<div className={styles.element} style={{ width: `${flex}%`, overflow: 'scroll' }}>
								<h4 style={{
									height: '16px', marginBottom: '6px', fontWeight: '400', fontSize: '12px',
								}}
								>
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
									disabled={disabled || disable}

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
	);
}
export default Child;
