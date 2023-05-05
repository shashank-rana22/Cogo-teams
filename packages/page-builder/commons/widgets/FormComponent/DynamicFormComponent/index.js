import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import FormLayout from '../../FormLayout';

import styles from './styles.module.css';

function DynamicFormComponent({
	formData,
	control,
	errors,
	dynamicHandleSubmit,
	onDynamicFormSubmit,
	handleEditForm = () => {},
	modeType,
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

			{modeType === 'edit' && (
				<div className={styles.show_wrapper}>
					<IcMEdit
						height="15px"
						width="15px"
						fill="#ffffff"
						cursor="pointer"
						onClick={() => handleEditForm(formData)}
					/>
				</div>
			)}
		</div>
	);
}

export default DynamicFormComponent;
