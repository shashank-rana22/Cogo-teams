import { cl } from '@cogoport/components';
import React from 'react';

import EditServiceCharges from '../EditServiceCharges';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const TOTAL_SPAN = 12;

function Layout({
	control = {}, fields = [], showElements = {}, errors, customValues = {}, formValues = {}, shipment_id = '',
}) {
	const TOTAL_FIELDS = [];
	let ROW_WISE_FIELDS = [];
	let span = 0;

	(fields || []).forEach((field) => {
		const { [field?.name]: showItem = true } = showElements;
		if (showItem) {
			if ((span + field.span) > TOTAL_SPAN) {
				TOTAL_FIELDS.push(ROW_WISE_FIELDS);
				ROW_WISE_FIELDS = [];
				ROW_WISE_FIELDS.push(field);
				span = field.span;
			} else {
				ROW_WISE_FIELDS.push(field);
				span += field.span;
			}
		}
	});

	if (ROW_WISE_FIELDS.length) {
		TOTAL_FIELDS.push(ROW_WISE_FIELDS);
	}

	return (
		<div className={styles.layout}>
			{Object.keys(TOTAL_FIELDS).map((rowFields) => (
				<div className={cl`${styles.row} form_layout_row`} key={rowFields}>
					{TOTAL_FIELDS[rowFields].map((field) => {
						const { type, heading = '' } = field || {};

						if (type === 'fieldArray') {
							return (
								<div className={styles.width_100} key={field.name}>
									{heading ? (
										<div className={styles.heading}>
											{heading}
										</div>
									) : null}

									<FieldArray
										{...field}
										error={errors?.[field?.name]}
										control={control}
										showElements={showElements}
										formValues={formValues}
									/>
								</div>
							);
						}

						if (type === 'edit_service_charges') {
							return (
								<div className={styles.width_100} key={field.name}>
									<EditServiceCharges
										control={control}
										customValues={customValues?.[field?.name]}
										shipment_id={shipment_id}
										error={errors?.[field?.name]}
										{...field}
									/>
								</div>
							);
						}
						return (
							<Item
								key={field.name}
								control={control}
								error={errors?.[field?.name]}
								formValues={formValues}
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
