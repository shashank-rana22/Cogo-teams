import React from 'react';

import { VALUE_ZERO } from '../../../../../../../../../constants';

import FieldArray from './ChildFormat';
import styles from './styles.module.css';

const VALUE_TWELVE = 12;

function Layout({
	control, fields, showElements = {}, register, errors,
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || VALUE_TWELVE;
			if (span === VALUE_TWELVE) {
				rowWiseFields.push(field);
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				span = VALUE_ZERO;
			} else if (span < VALUE_TWELVE) {
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
						return null;
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
