import React from 'react';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 1;
const ZEROTH_SPAN = 0;

function Layout({
	control = {}, fields = [], showElements = {}, errors = {},
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || TOTAL_SPAN;
			if (span === TOTAL_SPAN) {
				rowWiseFields.push(field);
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				span = ZEROTH_SPAN;
			} else if (span < TOTAL_SPAN) {
				rowWiseFields.push(field);
			} else {
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				rowWiseFields.push(field);
				span = field.span;
			}
		}
	});
	if (rowWiseFields.length) {
		TOTAL_FIELDS.push(rowWiseFields);
	}

	const totalFieldsObject = { ...TOTAL_FIELDS };

	return (
		<div className={styles.layout}>
			{Object.keys(totalFieldsObject).map((field) => (
				<div className={styles.row} key={field}>
					{totalFieldsObject[field].map((fieldsItem) => {
						const { type, heading = '', label = '', span:fieldArraySpan } = fieldsItem;
						const flex = ((fieldArraySpan || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;
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
