import { cl } from '@cogoport/components';
import React, { useMemo } from 'react';

import EditServiceCharges from '../EditServiceCharges';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const DEFAULT_SPAN = 6;
const REPLACE_SPAN_BY = 0;
function Layout({
	control = {}, fields = [], showElements = {}, errors = {}, customValues = {}, formValues = {},
	shipment_id = '', disabledProps = false,
}) {
	const TOTAL_FIELDS = [];

	let rowWiseFields = [];
	let span = 0;

	(fields || []).forEach((field) => {
		const { [field?.name]: showItem = true } = showElements;
		if (showItem) {
			span += field?.span || DEFAULT_SPAN;
			if (span === DEFAULT_SPAN) {
				span = REPLACE_SPAN_BY;

				rowWiseFields.push(field);
				TOTAL_FIELDS.push(rowWiseFields);

				rowWiseFields = [];
			} else if (span > DEFAULT_SPAN) {
				span = REPLACE_SPAN_BY;

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
		<main className={styles.layout}>
			{TOTAL_FIELDS.map((rowFields, i) => (
				<div className={cl`${styles.row} form_layout_row`} key={keysForFields[i]}>
					{rowFields.map((field) => {
						const { type, heading = '', name = '' } = field || {};

						if (type === 'fieldArray') {
							return (
								<section className={styles.width_100} key={field.name}>
									{heading ? (
										<div className={styles.heading}>
											{heading}
										</div>
									) : null}

									<FieldArray
										{...field}
										error={errors?.[name]}
										control={control}
										showElements={showElements}
										formValues={formValues}
									/>
								</section>
							);
						}

						if (type === 'edit_service_charges') {
							return (
								<section className={styles.width_100} key={field.name}>
									<EditServiceCharges
										error={errors?.[field?.name]}
										control={control}
										customValues={customValues?.[field?.name]}
										shipment_id={shipment_id}
										disabledProps={disabledProps}
										{...field}
									/>
								</section>
							);
						}

						return (
							<Item
								key={field.name}
								control={control}
								error={errors?.[name]}
								formValues={formValues}
								{...field}
							/>
						);
					})}
				</div>
			))}
		</main>
	);
}
export default Layout;
