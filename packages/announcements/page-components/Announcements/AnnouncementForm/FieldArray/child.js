/* eslint-disable import/no-relative-packages */
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

// eslint-disable-next-line import/order
import { getElementController } from '../../../../../access-management/utils/get-element-controller';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	showElements = {},
	disabled = false,
	showLabelOnce = false,
	lowerlabel = '',
	error = {},
	length = 0,
}) {
	return (
		<div className={styles.form_container}>
			<div className={styles.content}>
				{controls.map((controlItem) => {
					const { style, type, name: controlName } = controlItem;

					const show = !(controlItem.name in showElements)
						|| showElements[controlItem.name];

					const Element = getElementController(type);
					if (!Element && !show) return null;

					return (
						<div className={styles.form_item} style={{ ...style }} key={index}>
							{(showLabelOnce && index === 0 && controlItem.label)
							|| (!showLabelOnce && controlItem.label) ? (
								<div className={styles.heading}>{controlItem.label || lowerlabel}</div>
								) : null}

							<Element
								width="100%"
								key={`create_form_${controlItem.name}_${index}`}
								itemKey={`create_form_${controlItem.name}_${index}`}
								control={control}
								id={`create_form_${controlItem.name}_${index}`}
								{...controlItem}
								name={`${name}[${index}].${controlItem.name}`}
							/>
							<div className={styles.error_message}>
								{error?.[controlName]?.message || error?.[controlName]?.type}
							</div>
						</div>
					);
				})}

				{length >= 2 && !disabled ? (
					<IcMDelete
						className={`form-fieldArray-${name}-remove`}
						onClick={() => remove(index, 1)}
						style={{ width: '20px', height: '20px', cursor: 'pointer', marginLeft: '4px' }}
					/>
				) : null}
			</div>
		</div>
	);
}
export default Child;
