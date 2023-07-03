import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { DEFAULT_INDEX, TOTAL_PERCENT, VALUE_ONE, VALUE_ZERO } from '../../../../../../../../../../constants';
import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const VALUE_ELEVEN = 11;
const VALUE_TWELVE = 12;

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
		span += fields.span || VALUE_ELEVEN;
		if (span === VALUE_ELEVEN) {
			rowWiseFields.push(fields);
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			span = VALUE_ZERO;
		} else if (span < VALUE_ELEVEN) {
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
				<div key={fields[DEFAULT_INDEX]?.name} className={styles.row}>
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
						if (controlItem.customProps?.disabled) {
							EXTRA_PROPS.disabled = controlItem.customProps.disabled[index];
						}
						const disable = (index < noDeleteButtonTill
							&& controlItem.name === 'code') || controlItem.disabled;
						const flex = ((controlItem?.span || VALUE_TWELVE) / VALUE_TWELVE) * TOTAL_PERCENT;
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
									{...EXTRA_PROPS}
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
								onClick={() => remove(index, VALUE_ONE)}
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
