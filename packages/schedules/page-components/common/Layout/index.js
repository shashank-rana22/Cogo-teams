import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

const TWELVE = 12;
const HUNDRED = 100;
const ONE = 1;
function Layout({
	control, fields, showElements = {}, errors,
}) {
	let rowWiseFields = [];
	const TOTAL_FIELDS = [];
	let span = 0;
	(fields || []).forEach((field) => {
		if (!(field.name in showElements) || showElements[field.name]) {
			span += field.span || TWELVE;
			if (span === TWELVE) {
				rowWiseFields.push(field);
				TOTAL_FIELDS.push(rowWiseFields);
				rowWiseFields = [];
				span = GLOBAL_CONSTANTS.zeroth_index;
			} else if (span < TWELVE) {
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

	const totalFieldsObject = { ...TOTAL_FIELDS };

	return (
		<div className={styles.layout}>
			{Object.keys(totalFieldsObject).map((field) => (
				<div className={styles.row} key={field}>
					{totalFieldsObject[field].map((fieldsItem) => {
						const { type, heading = '', label = '', span:fieldArraySpan } = fieldsItem;
						const flex = ((fieldArraySpan || TWELVE) / TWELVE) * HUNDRED - ONE;
						const show = (!(totalFieldsObject[field].name in showElements)
						|| showElements[fieldsItem.name]);
						if (type === 'fieldArray' && show) {
							return (
								<>
									<div style={{ width: `${flex}%`, padding: '4px' }} key={fieldsItem.name}>

										{heading}

										{label}

									</div>
									<FieldArray
										{...fieldsItem}
										error={errors[fieldsItem.name]}
										control={control}
										showElements={showElements}
									/>
								</>

							);
						}
						return show ? (
							<Item
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
