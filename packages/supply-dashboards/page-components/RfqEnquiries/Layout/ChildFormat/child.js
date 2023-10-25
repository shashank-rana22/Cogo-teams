import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const TOTAL_SPANS = 12;
const SECOND_LAST_SPAN = 11;
const FIRST_INDEX = 0;
const SECOND_INDEX = 1;
const TOTAL_PERCENT = 100;

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
	const TOTAL_FIELDS = [];
	let span = 0;
	controls.forEach((fields) => {
		span += fields.span || SECOND_LAST_SPAN;
		if (span === SECOND_LAST_SPAN) {
			rowWiseFields.push(fields);
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			span = FIRST_INDEX;
		} else if (span < SECOND_LAST_SPAN) {
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

	return (
		<div className={styles.fieldarray} key={field.id}>
			{TOTAL_FIELDS.map((fields) => (
				<div key={fields[FIRST_INDEX]?.name} className={styles.row}>
					{fields.map((controlItem) => {
						const Element = getElementController(controlItem.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
						});
						const EXTRA_PROPS = {};
						if (controlItem.customProps?.options) {
							EXTRA_PROPS.options = controlItem.customProps.options[index];
						}
						if (controlItem.customProps?.rules) {
							EXTRA_PROPS.rules = controlItem.customProps.rules[index];
						}

						const disable = (index < noDeleteButtonTill
							&& controlItem.name === 'code') || controlItem.disabled;
						const flex = ((controlItem?.span || TOTAL_SPANS) / TOTAL_SPANS) * TOTAL_PERCENT;
						if (!Element) return null;
						return (
							<div key={controlItem.name} className={styles.element} style={{ width: `${flex}%` }}>
								<h4 style={{ fontWeight: 400, fontSize: '12px' }}>
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
					<div style={{ width: '2em', marginTop: '16px' }}>
						{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
							<IcMDelete
								className={`form-fieldArray-${name}-remove`}
								onClick={() => remove(index, SECOND_INDEX)}
								style={{
									width: '2em', height: '2em', cursor: 'pointer',
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
