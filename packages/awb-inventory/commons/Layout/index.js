import React from 'react';

import CONSTANTS from '../../configurations/constants';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_ONE, FLEX_HUNDRED } = CONSTANTS;
const ZERO_SPAN = 0;

function Layout({
	control, fields, showElements = {}, errors,
}) {
	let ROW_WISE_FIELDS = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || TOTAL_SPAN;
			if (span === TOTAL_SPAN) {
				ROW_WISE_FIELDS.push(field);
				TOTAL_FIELDS.push(ROW_WISE_FIELDS);
				ROW_WISE_FIELDS = [];
				span = ZERO_SPAN;
			} else if (span < TOTAL_SPAN) {
				ROW_WISE_FIELDS.push(field);
			} else {
				TOTAL_FIELDS.push(ROW_WISE_FIELDS);
				ROW_WISE_FIELDS = [];
				ROW_WISE_FIELDS.push(field);
				span = field.span;
			}
		}
	});
	if (ROW_WISE_FIELDS.length) {
		TOTAL_FIELDS.push(ROW_WISE_FIELDS);
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
