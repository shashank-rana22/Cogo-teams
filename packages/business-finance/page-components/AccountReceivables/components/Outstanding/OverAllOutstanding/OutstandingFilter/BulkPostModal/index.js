import { Button, Modal } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import usePostBulkUpdateAccount from '../../../../../hooks/usePostBulkUpdateAccount';

import styles from './styles.module.css';

function BulkPostModal({ showBulkPostModal = false, setShowBulkPostModal = () => {}, refetch = () => {} }) {
	const { control, formState: { errors = {} }, handleSubmit } = useForm();

	const { loading = false, onSubmit = () => {} } = usePostBulkUpdateAccount({ setShowBulkPostModal, refetch });

	return (
		<Modal size="md" show={showBulkPostModal} onClose={() => setShowBulkPostModal(false)}>
			<Modal.Header title="Bulk Update Account Tagging" />

			<Modal.Body>
				<UploadController
					name="bulk_update_excel"
					control={control}
					rules={{
						required: 'Excel is required!',
					}}
					accept=".xlsx"
				/>

				{errors?.bulk_update_excel ? (
					<div className={styles.errors}>
						{errors.bulk_update_excel?.message}
					</div>
				) : null}
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary" onClick={() => setShowBulkPostModal(false)}>Cancel</Button>

				<Button
					className={styles.btn_margin}
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
					loading={loading}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default BulkPostModal;
