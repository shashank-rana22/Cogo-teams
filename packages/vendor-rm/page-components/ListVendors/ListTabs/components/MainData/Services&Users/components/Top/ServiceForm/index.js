import { Button } from '@cogoport/components';
import React from 'react';

import FormLayout from '../../../../../../../../../commons/components/FormLayout/FormLayout';

import useCreateVendorServicePOC from './hooks/useCreateVendorServicePOC';
import styles from './styles.module.css';

function ServiceForm({
	setShowForm = () => {},
	getVendorData = {},
}) {
	const {
		handleSubmit = () => {},
		onSubmit = () => {},
		controls = [],
		control,
		errors = {},
		handleCancel = () => {},
		createVendorServicePocLoading = false,
	} = useCreateVendorServicePOC({
		setShowForm,
		getVendorData,
	});

	return (
		<div className={styles.container}>
			<FormLayout
				fields={controls}
				errors={errors}
				control={control}
			/>

			<div className={styles.button_container}>
				<Button
					size="md"
					role="presentation"
					themeType="secondary"
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button
					size="md"
					role="presentation"
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
					disabled={createVendorServicePocLoading}
					style={{
						marginLeft: '8px',
					}}
				>
					Save
				</Button>
			</div>

		</div>
	);
}

export default ServiceForm;
