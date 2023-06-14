import React from 'react';

import FieldArray from './ChildFormat';
import styles from './styles.module.css';

function Layout({
	control, fields, showElements = {}, register, errors,
}) {
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
	return (
		<div className={styles.layout}>
			{totalFields.map((field) => (
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
						return null;
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
