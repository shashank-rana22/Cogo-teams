import { Button, Modal } from '@cogoport/components';
import React from 'react';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';

import useCreateVendorServicePOC from './hooks/useCreateVendorServicePOC';
import styles from './styles.module.css';

function ServiceForm({
	refetchServicesPocs = () => {},
	showForm,
	setShowForm = () => {},
	getVendorData = {},
	refetchVendorInfo = () => {},
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
		refetchServicesPocs,
		refetchVendorInfo,
	});

	return (
		<Modal
			size="lg"
			show={showForm}
			onClose={() => setShowForm('')}
			placement="center"
		>
			<Modal.Header title="Add Service" />

			<div className={styles.body_container}>
				<Modal.Body>
					<div className={styles.container}>
						<FormLayout
							fields={controls}
							errors={errors}
							control={control}
						/>
					</div>
				</Modal.Body>
			</div>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
						onClick={handleCancel}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						themeType="primary"
						onClick={handleSubmit(onSubmit)}
						disabled={createVendorServicePocLoading}
						style={{
							marginLeft: '8px',
						}}
					>
						Add Service
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ServiceForm;
