import React from 'react';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const TOTAL_SPANS = 12;
const ZERO_SPAN = 0;

function Layout({
	control = [], fields = [], showElements = {}, register = {}, errors = {},
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || TOTAL_SPANS;
			if (span === TOTAL_SPANS) {
				rowWiseFields.push(field);
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				span = ZERO_SPAN;
			} else if (span < TOTAL_SPANS) {
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
				<div key={field.name} className={styles.row}>
					{field.map((fieldsItem) => {
						const { type, heading = '' } = fieldsItem;
						const show = (!(field.name in showElements) || showElements[fieldsItem.name]);
						if (!type && heading) {
							return <h4 key={heading} className={styles.empty_field}>{heading }</h4>;
						}
						if (type === 'fieldArray' && show) {
							return (
								<div key={fieldsItem.name} style={{ width: '100%' }}>
									<div className={styles.heading}>
										{heading}
									</div>

									<FieldArray
										{...fieldsItem}
										error={errors[fieldsItem.name]}
										control={control}
										register={register}
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
