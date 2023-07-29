import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import getElementController from '../getController';
import getErrorMessage from '../getErrorMessage';

import styles from './styles.module.css';

const HUNDRED = 100;
const ONE = 1;
const TWELVE = 12;
function Child({
	controls,
	control,
	index,
	name,
	field,
	error,
	length,
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	controls.forEach((fields) => {
		span += fields.span || TWELVE;
		if (span === TWELVE) {
			rowWiseFields.push(fields);
			TOTAL_FIELDS.push(rowWiseFields);
			rowWiseFields = [];
			span = GLOBAL_CONSTANTS.zeroth_index;
		} else if (span < TWELVE) {
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

	const getLabel = (controlItem) => {
		if (index === GLOBAL_CONSTANTS.zeroth_index) return 'Origin';
		if (index === length - ONE) return 'Destination';
		return controlItem?.label;
	};

	return (
		<div key={field.id}>

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
						const flex = ((controlItem?.span || TWELVE) / TWELVE) * HUNDRED - ONE;
						if (!Element) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={controlItem.name}>
								<h4 className={styles.child_label}>
									{controlItem?.name === 'location'
										? getLabel(controlItem) : controlItem?.label }
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

				</div>
			))}

		</div>
	);
}
export default Child;
