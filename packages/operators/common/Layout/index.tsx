import React from 'react';

import CONSTANTS from '../../constants/constants';

import Item from './Item';
import styles from './styles.module.css';

function Layout({
	control = {}, fields = [], showElements = {}, errors = {},
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || CONSTANTS.TOTAL_SPAN;
			if (span === CONSTANTS.TOTAL_SPAN) {
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
			{Object.keys(TOTAL_FIELDS).map((field) => (
				<div className={styles.row} key={field}>
					{TOTAL_FIELDS[field].map((fieldsItem) => {
						const show = (!(TOTAL_FIELDS[field].name in showElements)
						|| showElements[fieldsItem.name]);

						return show ? (
							<Item
								key={fieldsItem.name}
								control={control}
								error={errors[fieldsItem.name]}
								{...fieldsItem}
							/>
						) : null;
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
