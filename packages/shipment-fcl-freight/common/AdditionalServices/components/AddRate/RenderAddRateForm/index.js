import { SelectController, InputController } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

function RenderAddRateForm({
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors,
	serviceData = {},
	source = '',
}) {
	const { formControl } = controls({ serviceData, source });

	const controlTypeMapping = {
		select : SelectController,
		text   : InputController,
		number : InputController,
	};

	function FormElement({ name, label, type, ...rest }) {
		const Element = controlTypeMapping[type];

		return Element ? (
			<div>
				<div className={styles.label}>{label}</div>
				<Element name={name} type={type} {...rest} />
				{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
			</div>
		) : null;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
			{formControl.map((item) => <FormElement control={control} errors={errors} {...item} />)}
		</form>
	);
}

export default RenderAddRateForm;
