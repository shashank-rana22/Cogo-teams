import { cl } from '@cogoport/components';
import React from 'react';

import Item from './Item';
import styles from './styles.module.css';

const TOTAL_SPAN = 12;

function Layout({
	control = {}, fields = [], showElements = {}, errors = null, formValues = {},
}) {
	const TOTAL_FIELDS = [];
	let rowWiseFields = [];
	let span = 0;

	(fields || []).forEach((field) => {
		const { [field?.name]: showItem = true } = showElements;
		if (showItem) {
			if ((span + field.span) > TOTAL_SPAN) {
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				rowWiseFields.push(field);
				span = field.span;
			} else {
				rowWiseFields.push(field);
				span += field.span;
			}
		}
	});

	if (rowWiseFields.length) {
		TOTAL_FIELDS.push(rowWiseFields);
	}

	return (
		<div className={styles.layout}>
			{Object.keys(TOTAL_FIELDS).map((rowFields) => (
				<div className={cl`${styles.row} form_layout_row`} key={rowFields}>
					{TOTAL_FIELDS[rowFields].map((field) => (
						<Item
							key={field.name}
							control={control}
							error={errors?.[field?.name]}
							formValues={formValues}
							{...field}
						/>
					))}
				</div>
			))}
		</div>
	);
}
export default Layout;
