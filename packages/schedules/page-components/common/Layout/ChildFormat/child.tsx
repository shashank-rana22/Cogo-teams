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
	field,
	error,
	length,
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

	const totalFieldsObject = { ...totalFields };

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
						const extraProps:NestedObj = {};
						if (controlItem.customProps?.options) {
							extraProps.options = controlItem.customProps.options[index];
						}
						const flex = ((controlItem?.span || 12) / 12) * 100 - 1;
						if (!Element) return null;
						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={controlItem.name}>
								<h4 className={styles.child_label}>
									{controlItem?.name === 'location' ? (index === 0 ? 'Origin' : length - 1 === index ? 'Destination' : controlItem?.label) : controlItem?.label }
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

				</div>
			))}

		</div>
	);
}
export default Child;
