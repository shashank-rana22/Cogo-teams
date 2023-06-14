import React from 'react';

import CONSTANTS from '../../constants/CONSTANTS';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_ONE, FLEX_HUNDRED } = CONSTANTS;

function Layout({
	control, fields, showElements = {}, errors,
}) {
	let ROW_WISE_FIELDS = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			if ((span + fields.span) > TOTAL_SPAN) {
				TOTAL_FIELDS.push(ROW_WISE_FIELDS);
				ROW_WISE_FIELDS = [];
				ROW_WISE_FIELDS.push(fields);
				span = fields.span;
			} else {
				ROW_WISE_FIELDS.push(fields);
				span += fields.span;
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
