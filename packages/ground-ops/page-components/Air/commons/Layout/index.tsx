import { cl } from '@cogoport/components';
import React, { useMemo } from 'react';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function Layout({
	control, fields, showElements = {}, errors,
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || 12;
			if (span === 12) {
				rowWiseFields.push(field);
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				span = 0;
			} else if (span < 12) {
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

	const keysForPreference = useMemo(
		() => Array(TOTAL_FIELDS.length).fill(null).map(() => Math.random()),
		[TOTAL_FIELDS.length],
	);

	return (
		<div className={styles.layout}>
			{TOTAL_FIELDS.map((field, index) => (
				<div key={keysForPreference[index]} className={styles.row}>
					{field.map((fieldsItem) => {
						const { type, heading = '', label = '', rules = {}, span: fieldArraySpan } = fieldsItem;
						const flex = ((fieldArraySpan || 12) / 12) * 100 - 1;
						const show = (!(field.name in showElements) || showElements[fieldsItem.name]);
						if (type === 'fieldArray' && show) {
							return (
								<div key={fieldsItem.name} style={{ width: `${flex}%`, padding: '4px' }}>
									<div className={styles.heading}>
										{heading}
									</div>
									<h4 className={cl`${styles.label} ${rules?.required ? styles.required_field : ''}`}>
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
						return show
							? (
								<Item
									control={control}
									error={errors[fieldsItem.name]}
									{...fieldsItem}
								/>

							)
							: null;
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
