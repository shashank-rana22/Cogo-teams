import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FormLayout from '../../FormLayout';

import styles from './styles.module.css';

function DynamicFormComponent({ formData, onDynamicFormSubmit }) {
	const { buttonText, controls, heading } = formData || {};

	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
	} = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{heading}</div>
			<FormLayout
				controls={controls}
				control={control}
				errors={errors}
				showElements={{}}
			/>
			<div className={styles.button_wrapper}>
				<Button onClick={handleSubmit(onDynamicFormSubmit)}>{buttonText}</Button>
			</div>
		</div>
	);
}

export default DynamicFormComponent;
