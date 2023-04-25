import { Button } from '@cogoport/components';

import FormLayout from '../../FormLayout';

import styles from './styles.module.css';

function DynamicFormComponent({
	formData, control, errors,	dynamicHandleSubmit,
	onDynamicFormSubmit,
}) {
	const { controls, buttonText } = formData || {};

	return (
		<div>
			<FormLayout
				controls={controls}
				control={control}
				errors={errors}
				showElements={{}}
			/>
			<div className={styles.button_wrapper}>
				<Button onClick={dynamicHandleSubmit(onDynamicFormSubmit)}>
					{buttonText || 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default DynamicFormComponent;
