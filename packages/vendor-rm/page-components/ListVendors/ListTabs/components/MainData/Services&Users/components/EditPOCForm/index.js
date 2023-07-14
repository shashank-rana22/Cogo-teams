import { Button, Modal } from '@cogoport/components';
import React from 'react';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';
import styles from '../ShowPocForm/styles.module.css';

import useAddServicePoc from './hooks/useUpdateServicePoc';

function EditPOCForm({
	showForm,
	setShowForm,
	getVendorData,
	refetchServicesPocs,
	refetchVendorInfo,
}) {
	const {
		loading,
		updatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	} = useAddServicePoc({
		showForm,
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
			<Modal.Header title="Update POC Details" />

			<Modal.Body>
				<FormLayout
					fields={updatedControls}
					errors={errors}
					control={control}
				/>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						size="md"
						type="button"
						themeType="tertiary"
						disabled={loading}
						style={{ marginRight: 12 }}
						onClick={() => setShowForm('')}
					>
						CANCEL
					</Button>

					<Button
						size="md"
						type="submit"
						themeType="primary"
						disabled={loading}
						onClick={handleSubmit(onSubmit)}
					>
						SUBMIT
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default EditPOCForm;
