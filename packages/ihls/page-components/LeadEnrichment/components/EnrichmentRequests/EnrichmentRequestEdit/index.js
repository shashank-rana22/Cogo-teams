import { Button, Modal } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';

import useUpdateEnrichmentRequest from '../../../hooks/useUpdateEnrichmentRequest';

import styles from './styles.module.css';

function EnrichmentRequestEdit({ request = {}, onClose = () => {}, refetch = () => {} }) {
	const {
		onUpdate,
		loading,
		control,
		errors,
		handleSubmit,
	} = useUpdateEnrichmentRequest({ requestId: request?.id, refetch, onClose });

	return (
		<Modal
			show={request?.type === 'edit'}
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title="Upload Enriched File" />
			<form onSubmit={handleSubmit(onUpdate)}>
				<Modal.Body className={styles.modal_body}>
					<div className={styles.container}>
						<UploadController
							control={control}
							errors={errors}
							name="upload_question"
							accept=".csv, .xlsx"
							rules={{ required: 'File is required.' }}
						/>

						{errors.upload_question && (
							<div className={styles.error_msg}>
								{errors.upload_question.message}
							</div>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button_div}>
						<Button
							loading={loading}
							type="submit"
						>
							Update
						</Button>
						<Button themeType="secondary" onClick={onClose}>Close</Button>
					</div>
				</Modal.Footer>
			</form>
		</Modal>
	);
}
export default EnrichmentRequestEdit;
