import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getElementController } from './getElementController';
import styles from './styles.module.css';

function Child({
	controls,
	control,
	index,
	name,
	remove,
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

					const Element = getElementController(type);

					return (
						<div className={styles.form_item} style={{ ...style }} key={`${controlName}_${index}`}>
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
								disabled={disabled}
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
						className={styles.remove_icon}
						onClick={() => remove(index, 1)}
					/>
				) : null}
			</div>
		</div>
	);
}
export default Child;
