import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getElementController } from '../getElementController';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	error,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	showElements = {},
	disabled = false,
	showLabelOnce = false,
	lowerlabel = '',
}) {
	return (
		<div key={`${name}_${index}`} className={styles.form_container}>
			<div className={styles.content}>
				{(controls || []).map((controlItem) => {
					const { style, type, name: controlName } = controlItem;

					const show = !(controlItem.name in showElements) || showElements[controlItem.name];

					const Element = getElementController(type);

					if (!Element && !show) {
						return null;
					}

					return show ? (
						<div
							className={styles.form_item}
							style={{ 	padding: '8px', ...style }}
							key={index}
						>
							<div className={styles.list}>
								{(showLabelOnce && index === 0 && controlItem.label)
							|| (!showLabelOnce && controlItem.label) ? (

								<div>{controlItem.label || lowerlabel}</div>

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
						</div>
					) : null;
				})}

				{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
					<IcMDelete
						className={`form-fieldArray-${name}-remove`}
						onClick={() => remove(index, 1)}
						style={{ width: '20px', height: '20px' }}
					/>
				) : null}
			</div>
		</div>
	);
}
export default Child;
