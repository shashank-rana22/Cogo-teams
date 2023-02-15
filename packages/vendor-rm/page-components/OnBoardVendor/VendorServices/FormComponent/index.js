import { Button } from '@cogoport/components';
import React from 'react';

import { getElementController } from '../../../../utils/get-element-controller';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

function FormComponent({
	controls = [],
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors = {},
}) {
	return (
		<div className={styles.main_body}>
			{controls.map((controlItem) => {
				const field = { ...controlItem };

				const { span, name, label, ...rest } = field;

				if (rest.type === 'fieldArray') {
					return (
						<FieldArray {...rest} control={control} name={name} />
					);
				}

				const Element = getElementController(rest.type);

				return (
					<div style={{ display: 'flex', flexDirection: 'column', flexBasis: span }}>
						<div className={styles.form_label}>{label}</div>
						<div>
							<Element
								key={name}
								{...field}
								control={control}
								id={`onboard_vendor_form_${name}_input`}
							/>
						</div>
						<div className={styles.form_error_message}>
							{errors?.[field.name]?.message}
						</div>
					</div>
				);
			})}

			<Button
				className="primary"
				onClick={handleSubmit(onSubmit)}
			>
				save
			</Button>

		</div>
	);
}

export default FormComponent;
