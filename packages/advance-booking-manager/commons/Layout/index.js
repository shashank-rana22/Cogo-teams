import { cl } from '@cogoport/components';
import React from 'react';

import CONSTANTS from '../../constants/constants';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_ONE, FLEX_HUNDRED } = CONSTANTS;

function Layout({
	control = {}, fields = {}, showElements = {}, errors = {},
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || TOTAL_SPAN;
			if (span === TOTAL_SPAN) {
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				rowWiseFields.push(field);
				span = field.span;
			} else {
				rowWiseFields.push(field);
				span += field.span;
			}
		}
	});
	if (rowWiseFields.length) {
		TOTAL_FIELDS.push(rowWiseFields);
	}

	return (
		<div className={cl`${styles.layout} layout_ui`}>
			{Object.keys(TOTAL_FIELDS).map((field) => (
				<div className={cl`${styles.row} row_ui`} key={field}>
					{TOTAL_FIELDS[field].map((fieldsItem) => {
						const { type, heading = '', label = '', span:fieldArraySpan } = fieldsItem;
						const flex = ((fieldArraySpan || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;
						const show = (!(TOTAL_FIELDS[field].name in showElements)
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
								key={fieldsItem.name}
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