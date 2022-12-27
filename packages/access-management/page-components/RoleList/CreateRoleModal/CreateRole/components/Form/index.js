import { Button } from '@cogoport/components';
import { InputController, SelectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		default:
			return null;
	}
};

function Form({
	controls = () => [],
	formProps = {},
	errors = {},
	onSubmit = () => {},
	onErrors = () => {},
}) {
	const { handleSubmit, control } = formProps;

	return (
		<form
			className={styles.form_container}
			id="rnp_role_list_create_role_form"
			onSubmit={handleSubmit(onSubmit, onErrors)}
		>
			{controls?.map((controlItem) => {
				const Element = getElementController(controlItem.type);

				if (!Element) return null;

				return (
					<div style={{ flex: controlItem.flex }}>
						<div className={styles.form_group}>
							<span>{controlItem?.label}</span>
							<div className={styles.input_group}>
								<Element
									{...controlItem}
									control={control}
									id={`rnp_role_list_create_role_form_${controlItem?.name}_input`}
								/>
								<div className={styles.error_message}>
									{errors?.[controlItem?.name]?.message}
								</div>
							</div>
						</div>
					</div>
				);
			})}

		</form>
	);
}

export default Form;
