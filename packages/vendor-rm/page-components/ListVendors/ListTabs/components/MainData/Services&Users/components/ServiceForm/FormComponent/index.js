import React from 'react';

import { getElementController } from '../../../../../../../../../utils/get-element-controller';
import styles from '../styles.module.css';

function FormComponent({
	controls = [],
	control,
	errors,
}) {
	return (
		<div className={styles.form_container}>
			{controls.map((controlItem) => {
				const Element = getElementController(controlItem?.type);

				return (
					<div
						key={controlItem.name}
						className={styles.form_group}
						style={{ flexBasis: '30%', margin: '4px' }}
					>
						<div className={styles.form_label}>
							{controlItem.label}
						</div>

						<div>
							<Element
								{...controlItem}
								key={controlItem.name}
								control={control}
								id={`onboard_vendor_form_${controlItem.name}_input`}
							/>
							<div className={styles.error_message}>
								{errors?.[controlItem.name]?.message}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default FormComponent;
