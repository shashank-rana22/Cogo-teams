import { cl } from '@cogoport/components';
import { UploadController, AsyncSelectController, SelectController, InputController } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

const CONTROL_TYPE_MAPPING = {
	select         : SelectController,
	'async-select' : AsyncSelectController,
	input          : InputController,
	file           : UploadController,
};

function FormElement({ name, label, errors, type, ...rest }) {
	const Element = CONTROL_TYPE_MAPPING[type];

	return Element ? (
		<div className={cl`${styles.input_container} ${styles[rest.className]}`}>
			<label htmlFor={name}>{label}</label>

			<Element name={name} type={type} {...rest} />

			{errors[name] && (
				<span className={styles.errors}>
					{errors[name].message}
				</span>
			)}
		</div>
	) : null;
}

function Form({ control, errors, watch }) {
	const { formControl } = controls({ watch });

	return (
		<div>
			<div className={styles.form_container}>
				{formControl.map((field) => (
					<FormElement
						key={field.name}
						control={control}
						errors={errors}
						{...field}
					/>
				))}
			</div>
		</div>
	);
}

export default Form;
