import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import FormLayout from '../../../../../../../../common/FormLayout';
import CREATE_TEMPLATE_CONFIG from '../../../../../../../../configurations/create-template-config';
import useCreateEmailTemplate from '../../../../../../../../hooks/useCreateEmailTemplate';

import styles from './styles.module.css';

function CreateTemplate({
	setShowCreation = () => {},
}) {
	const {
		control,
		handleSubmit = () => {},
		formState: { errors },
	} = useForm();

	const {
		createTemplate,
		loading,
	} = useCreateEmailTemplate({ setShowCreation });

	const onSubmit = (data) => {
		createTemplate({ data });
	};

	return (
		<form className={styles.container}>
			<div className={styles.header_container}>
				<h3>Add New Template</h3>
				<Button
					size="md"
					type="submit"
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
					themeType="secondary"
				>
					Create
				</Button>
			</div>

			<FormLayout
				control={control}
				controls={CREATE_TEMPLATE_CONFIG}
				errors={errors}
			/>
		</form>
	);
}

export default CreateTemplate;
