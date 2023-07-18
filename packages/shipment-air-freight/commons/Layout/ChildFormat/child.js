import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import CONSTANTS from '../../../constants/CONSTANTS';
import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;

const { TOTAL_SPAN, FLEX_ONE, FLEX_HUNDRED } = CONSTANTS;

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

	const totalFieldsObject = { ...TOTAL_FIELDS };

	return (
		<div className={styles.fieldarray} key={field?.id}>
			{Object.keys(totalFieldsObject).map((key) => (
				<div className={styles.row} key={key}>
					{totalFieldsObject[key].map((controlItem) => {
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
						const flex = ((controlItem?.span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;
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
					<div style={{ width: '32px', marginTop: '24px' }}>
						{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
							<IcMDelete
								className={`form-fieldArray-${name}-remove ${styles.delete_icon}`}
								onClick={() => remove(index, NO_OF_ELEMENTS_TO_BE_REMOVED)}
							/>
						) : null}
					</div>
				</div>
			))}
		</div>
	);
}
export default Child;
