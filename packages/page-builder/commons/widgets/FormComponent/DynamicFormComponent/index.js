import FormLayout from '../../FormLayout';

import styles from './styles.module.css';

function DynamicFormComponent({ formData, control, errors }) {
	const { controls } = formData || {};

	return (
		<div className={styles.container}>
			<FormLayout
				controls={controls}
				control={control}
				errors={errors}
				showElements={{}}
			/>
			{/* <div className={styles.button_wrapper}>
				<Button onClick={handleSubmit(onDynamicFormSubmit)}>{buttonText}</Button>
			</div> */}
		</div>
	);
}

export default DynamicFormComponent;
