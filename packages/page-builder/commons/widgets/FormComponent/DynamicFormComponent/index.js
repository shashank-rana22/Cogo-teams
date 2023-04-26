import { Button } from '@cogoport/components';
import { IcMFacebook } from '@cogoport/icons-react';

import FormLayout from '../../FormLayout';

import styles from './styles.module.css';

function DynamicFormComponent({
	formData,
	control,
	errors,
	dynamicHandleSubmit,
	onDynamicFormSubmit,
	handleEditForm = () => {},
}) {
	const { controls, buttonText } = formData || {};

	return (
		<div className={styles.block_wrapper}>
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
			<div className={styles.show_wrapper}>
				<IcMFacebook
					height="24px"
					width="24px"
					cursor="pointer"
					onClick={() => handleEditForm(formData)}
				/>
			</div>
		</div>
	);
}

export default DynamicFormComponent;
