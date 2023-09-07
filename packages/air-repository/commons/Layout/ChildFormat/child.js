import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 1;
const ZEROTH_SPAN = 0;

function Child({
	controls = [],
	control = {},
	index = '',
	name = '',
	remove = '',
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
	field = {},
	error = {},
}) {
	const { t } = useTranslation(['airRepository']);
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	controls.forEach((fields) => {
		span += fields.span || TOTAL_SPAN;
		if (span === TOTAL_SPAN) {
			rowWiseFields.push(fields);
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			span = ZEROTH_SPAN;
		} else if (span < TOTAL_SPAN) {
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

	const TOTAL_FIELDSObject = { ...TOTAL_FIELDS };

	return (
		<div className={styles.fieldarray} key={field.id}>
			{Object.keys(TOTAL_FIELDSObject).map((key) => (
				<div className={styles.row} key={key}>
					{TOTAL_FIELDSObject[key].map((controlItem) => {
						const Element = getElementController(controlItem.type);

						const errorOriginal = getErrorMessage({
							error : error?.[controlItem.name],
							rules : controlItem?.rules,
							label : controlItem?.label,
							t,
						});
						const EXTRA_PROPS = {};
						if (controlItem.customProps?.options) {
							EXTRA_PROPS.options = controlItem.customProps.options[index];
						}
						const flex = ((controlItem?.span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;
						if (!Element) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={controlItem.name}>
								<div className={cl`${styles.child_label} 
								${controlItem?.rules?.required ? styles.required_field : ''}`}
								>
									{controlItem?.label}
								</div>
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
								className={cl`form-fieldArray-${name}-remove ${styles.delete_icon}`}
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
