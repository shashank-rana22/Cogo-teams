import { Button } from '@cogoport/components';
import { InputController, UploadController, useForm } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

const controlTypeMapping = {
	file   : UploadController,
	text   : InputController,
	number : InputController,
};

function FormElement({ name, label, errors, type, span, ...rest }) {
	const Element = controlTypeMapping[type];
	const widthVal = (span / 12) * 100;
	return Element ? (
		<div style={{ width: `${widthVal}%` }}>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function Form({ handleUploadHBL }) {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		if (data) {
			handleUploadHBL(data);
		}
	};

	return (
		<>
			<form className={styles.form_container}>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} key={item?.name} />)}
			</form>
			<Button
				style={{ marginLeft: 8 }}
				onClick={handleSubmit(onSubmit)}
			>
				Save
			</Button>
		</>
	);
}

export default Form;
