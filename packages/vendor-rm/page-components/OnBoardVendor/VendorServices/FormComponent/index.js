import React from 'react';

import { getElementController } from '../../../../utils/get-element-controller';
import FieldArray from '../FieldArray';

// import FieldArray from './FieldArray';
import styles from './styles.module.css';

function FormComponent({
	controls = [],
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors = {},
}) {
	console.log('errors:: ', errors);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.main_body}>
			{controls.map((controlItem) => {
				const { span, name, label, ...rest } = controlItem;

				if (rest.type === 'fieldArray') {
					return (
						<FieldArray
							{...controlItem}
							control={control}
							name={controlItem.name}
							error={errors?.[controlItem.name]}
						/>
					);
				}

				const Element = getElementController(rest.type);

				return (
					<div style={{ display: 'flex', flexDirection: 'column', flexBasis: span }}>
						<div className={styles.form_label}>{label}</div>
						<div>
							<Element
								key={name}
								{...controlItem}
								control={control}
								id={`onboard_vendor_form_${name}_input`}
							/>
						</div>
						<div className={styles.form_error_message}>
							{errors?.[controlItem.name]?.message}
						</div>
					</div>
				);
			})}
		</form>
	);
}

export default FormComponent;
