import React from 'react';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

interface LayoutInterface {
	control?:object
	fields?:Array<{ name?:string, span?:number }>
	showElements?:object
	errors?:object
}
function Layout({
	control, fields, showElements = {}, errors,
}:LayoutInterface) {
	let rowWiseFields = [];
	const totalFields = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || 12;
			if (span === 12) {
				rowWiseFields.push(field);
				totalFields.push(rowWiseFields);
				rowWiseFields = [];
				span = 0;
			} else if (span < 12) {
				rowWiseFields.push(field);
			} else {
				totalFields.push(rowWiseFields);
				rowWiseFields = [];
				rowWiseFields.push(field);
				span = field.span;
			}
		}
	});
	if (rowWiseFields.length) {
		totalFields.push(rowWiseFields);
	}

	const totalFieldsObject = { ...totalFields };

	return (
		<div className={styles.layout}>
			{Object.keys(totalFieldsObject).map((field) => (
				<div className={styles.row} key={field}>
					{totalFieldsObject[field].map((fieldsItem) => {
						const { type, heading = '', label = '', span:fieldArraySpan } = fieldsItem;
						const flex = ((fieldArraySpan || 12) / 12) * 100 - 1;
						const show = (!(totalFieldsObject[field].name in showElements)
						|| showElements[fieldsItem.name]);
						if (type === 'fieldArray' && show) {
							return (
								<div style={{ width: `${flex}%`, padding: '4px' }} key={fieldsItem.name}>
									<div className={styles.heading}>
										{heading}
									</div>

									<h4 className={styles.label}>
										{label}
									</h4>

									<FieldArray
										{...fieldsItem}
										error={errors[fieldsItem.name]}
										control={control}
										showElements={showElements}
									/>

								</div>
							);
						}
						return show ? (
							<Item
								control={control}
								error={errors[fieldsItem.name]}
								{...fieldsItem}
							/>
						) : null;
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
