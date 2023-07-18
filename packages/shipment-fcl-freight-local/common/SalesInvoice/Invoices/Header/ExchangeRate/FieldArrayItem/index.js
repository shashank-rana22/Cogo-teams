import { InputController, useFieldArray } from '@cogoport/forms';

import styles from '../styles.module.css';

function FormElement({ namePrefix, name, label, errors, value, ...rest }) {
	const fieldName = `${namePrefix}.${name}`;

	return (
		<div className={styles.form_container}>
			<div className={styles.label}>{label}</div>
			<InputController name={fieldName} {...rest} />
			{errors?.[name] ? <div className={styles.errors}>{errors[name]?.message}</div> : null}
		</div>
	);
}

export default function FieldArrayItem({ control, controls, errors = [] }) {
	const { fields } = useFieldArray({ name: controls.name, control });
	return (
		<div className={styles.form}>
			{fields.map((field, index) => controls.controls.map((ctrl) => (
				<FormElement
					key={field.id}
					namePrefix={`${controls.name}.${index}`}
					control={control}
					errors={errors[index]}
					{...ctrl}
				/>
			)))}
		</div>
	);
}
