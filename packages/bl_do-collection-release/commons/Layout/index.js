import { cl } from '@cogoport/components';
import React from 'react';
import { v4 as uuid } from 'uuid';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function Layout({
	control, fields, showElements = {}, errors, formValues,
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

	return (
		<div className={styles.layout}>
			{totalFields.map((rowFields) => (
				<div className={cl`${styles.row} form_layout_row`} key={uuid()}>
					{rowFields.map((field) => {
						const { type, heading = '' } = field || {};

						if (type === 'fieldArray') {
							return (
								<div className={styles.width_100} key={uuid()}>
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

						return (
							<Item
								control={control}
								error={errors?.[field?.name]}
								formValues={formValues}
								{...field}
								key={uuid()}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
