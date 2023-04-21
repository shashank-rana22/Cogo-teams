import { cl } from '@cogoport/components';
import React from 'react';

import FieldArray from './ChildFormat';
import EditServiceCharges from './EditServiceCharges';
import Item from './Item';
import styles from './styles.module.css';

function Layout({
	control, fields, showElements = {}, errors, customValues = {},
}) {
	let rowWiseFields = [];
	const totalFields = [];
	let span = 0;

	(fields || []).forEach((field) => {
		const { [field.name]: showItem = true } = showElements;
		if (showItem) {
			span += field.span || 12;
			if (span === 12) {
				span = 0;
				rowWiseFields.push(field);
				totalFields.push(rowWiseFields);
				rowWiseFields = [];
			} else if (span > 12) {
				span = 0;
				totalFields.push(rowWiseFields);
				rowWiseFields = [];
				rowWiseFields.push(field);
			} else {
				rowWiseFields.push(field);
			}
		}
	});

	if (rowWiseFields.length) {
		totalFields.push(rowWiseFields);
	}
	return (
		<div className={styles.layout}>
			{totalFields.map((rowFields) => (
				<div className={cl`${styles.row} form_layout_row`}>
					{rowFields.map((field) => {
						const { type, heading = '' } = field;

						if (type === 'fieldArray') {
							return (
								<div className={styles.width_100}>
									{heading ? (
										<div className={styles.heading}>
											{heading}
										</div>
									) : null}

									<FieldArray
										{...field}
										error={errors[field.name]}
										control={control}
										showElements={showElements}
									/>
								</div>
							);
						}

						if (type === 'edit_service_charges') {
							return (
								<div className={styles.width_100}>
									<EditServiceCharges
										control={control}
										customValues={customValues[field.name]}
										{...field}
									/>
								</div>
							);
						}

						return (
							<Item
								control={control}
								error="aasda"
								{...field}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
