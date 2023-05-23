import { cl } from '@cogoport/components';
import React, { useMemo } from 'react';

import FieldArray from './ChildFormat';
import EditServiceCharges from './EditServiceCharges';
import Item from './Item';
import styles from './styles.module.css';

function Layout({
	control, fields, showElements = {}, errors, customValues = {}, formValues,
}) {
	const totalFields = [];

	let rowWiseFields = [];
	let span = 0;

	(fields || []).forEach((field) => {
		const { [field?.name]: showItem = true } = showElements;
		if (showItem) {
			span += field?.span || 12;
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

	const keysForRows = useMemo(
		() => Array(totalFields.length).fill(null).map(() => Math.random()),
		[totalFields.length],
	);

	return (
		<div className={styles.layout}>
			{totalFields.map((rowFields, i) => (
				<div className={cl`${styles.row} form_layout_row`} key={keysForRows[i]}>
					{rowFields.map((field) => {
						const { type, heading = '', name = '' } = field || {};

						if (type === 'fieldArray') {
							return (
								<div className={styles.width_100} key={name}>
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
								</div>
							);
						}

						if (type === 'edit_service_charges') {
							return (
								<div className={styles.width_100} key={name}>
									<EditServiceCharges
										control={control}
										customValues={customValues?.[name]}
										{...field}
									/>
								</div>
							);
						}

						return (
							<Item
								key={name}
								control={control}
								error={errors?.[name]}
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
