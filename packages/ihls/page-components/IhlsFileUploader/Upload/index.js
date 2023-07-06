import { Button, Modal } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';

import styles from './style.module.css';
import useBulkFileUpload from './useBulkFileUpload';

function Upload({ refetch, show, setShow }) {
	const onClose = () => {
		setShow(!show);
	};
	const {
		bulkUpload,
		BulkFileLoading,
		control,
		errors,
		handleSubmit,
	} = useBulkFileUpload({ refetch, setShow });

	return (
		<Modal size="md" show={show} onClose={onClose} placement="top">
			<Modal.Header title="Upload a file" />
			<Modal.Body>
				<div className={styles.container}>

					<div className={styles.uploader}>
						<UploadController
							multiple
							control={control}
							errors={errors}
							name="upload_question"
							accept=".csv, .xlsx, .pdf"
							rules={{ required: 'File is required.' }}
						/>

						{errors.upload_question && (
							<div className={styles.error_msg}>
								{errors.upload_question.message}
							</div>
						)}
					</div>
				</div>
				{/* <div style={{ display: 'block', alignItems: 'center', marginBottom: '16px' }}>
                            <p>Multiple Drag and drop</p>
                            <FileSelect
                                multiple
                                value={multiFileValue}
                                loading={loading}
                                onChange={setMultiFileValue}
                                onClick={setMultiFileValue}
                                accept=".png,.pkg,.jpg" />
                        </div> */}
			</Modal.Body>
			<Modal.Footer className={styles.footer}>
				<div className={styles.btn_row}>
					<Button
						size="md"
						themeType="primary"
						style={{ marginLeft: 10 }}
						loading={BulkFileLoading}
						onClick={handleSubmit(bulkUpload)}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>

	);
}

export default Upload;
