import React from 'react';
import { v4 as uuid } from 'uuid';

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

	return (
		<div className={styles.layout}>
			{TOTAL_FIELDS.map((field) => (
				<div key={uuid()} className={styles.row}>
					{field.map((fieldsItem) => {
						const { type, heading = '', label = '', span: fieldArraySpan } = fieldsItem;
						const flex = ((fieldArraySpan || 12) / 12) * 100 - 1;
						const show = (!(field.name in showElements) || showElements[fieldsItem.name]);
						if (type === 'fieldArray' && show) {
							return (
								<div key={fieldsItem.name} style={{ width: `${flex}%`, padding: '4px' }}>
									<div className={styles.heading}>
										{heading}
									</div>
									<h4 style={{
										height: '16px', marginBottom: '6px', fontWeight: '400', fontSize: '12px',
									}}
									>
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
