import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useMemo } from 'react';

import EditServiceCharges from '../EditServiceCharges';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const TOTAL_SPAN = 12;

function Layout({
	control = {}, fields = [], showElements = {}, errors = {}, customValues = {}, formValues = {}, shipment_id = '',
}) {
	const TOTAL_FIELDS = [];
	let rowWiseFields = [];
	let span = 0;

	(fields || []).forEach((field) => {
		const { [field?.name]: showItem = true } = showElements;
		if (showItem) {
			span += field?.span || TOTAL_SPAN;
			if (span === TOTAL_SPAN) {
				span = GLOBAL_CONSTANTS.zeroth_index;

				rowWiseFields.push(field);
				TOTAL_FIELDS.push(rowWiseFields);

				rowWiseFields = [];
			} else if (span > TOTAL_SPAN) {
				span = GLOBAL_CONSTANTS.zeroth_index;

				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];

				rowWiseFields.push(field);
			} else {
				rowWiseFields.push(field);
			}
		}
	});

	if (rowWiseFields.length) {
		TOTAL_FIELDS.push(rowWiseFields);
	}

	const keysForFields = useMemo(
		() => Array(TOTAL_FIELDS.length).fill(null).map(() => Math.random()),
		[TOTAL_FIELDS.length],
	);

	return (
		<div className={styles.layout}>
			{TOTAL_FIELDS.map((rowFields, i) => (
				<div className={cl`${styles.row} form_layout_row`} key={keysForFields[i]}>
					{rowFields.map((field) => {
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
