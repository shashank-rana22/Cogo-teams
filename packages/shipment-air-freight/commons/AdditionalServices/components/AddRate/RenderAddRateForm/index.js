import { SelectController, InputController, AsyncSelectController } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

const controlTypeMapping = {
	select      : SelectController,
	text        : InputController,
	number      : InputController,
	asyncSelect : AsyncSelectController,
};

function FormElement({ name, label, type, show, rules, errors, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element && show ? (
		<div>
			<div className={styles.label}>
				{label}
				<div className={styles.requiredField}>
					{rules?.required ? '*' : ''}
				</div>
			</div>

			<Element name={name} type={type} {...rest} />

			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function RenderAddRateForm({
	control = () => { },
	errors = {},
	serviceData = {},
	source = '',
}) {
	const { formControl } = controls({ serviceData, source });
	console.log(formControl, 'formControl');

	return (
		<form className={styles.form_container}>
			{formControl.map((item) => <FormElement key={item.name} control={control} errors={errors} {...item} />)}
		</form>
	);
}

export default RenderAddRateForm;
