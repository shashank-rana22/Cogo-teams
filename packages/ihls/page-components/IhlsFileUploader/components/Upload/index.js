import { Button, Modal } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';

import styles from './style.module.css';
import useBulkFileUpload from './useBulkFileUpload';

function Upload({ refetch = () => {}, show = false, setShow = () => {} }) {
	const {
		bulkUpload,
		bulkFileLoading,
		control,
		errors,
		handleSubmit,
	} = useBulkFileUpload({ refetch, setShow });

	const onClose = () => {
		setShow(false);
	};

	return (
		<Modal size="md" show={show} onClose={onClose} placement="top">
			<Modal.Header title="Upload a file" />

			<Modal.Body>
				<div className={styles.container}>
					<UploadController
						multiple
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
				<Button
					type="button"
					size="md"
					themeType="primary"
					loading={bulkFileLoading}
					onClick={handleSubmit(bulkUpload)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Upload;
