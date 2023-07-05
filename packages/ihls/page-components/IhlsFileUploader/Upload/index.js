import { Button, Modal, RadioGroup, Select, FileSelect } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { IcMAppDocumentUpload, IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './style.module.css';
import useBulkCreateQuestionAnswerSet from './useBulkCreateQuestionAnswerSet';

function Upload({ refetch, show, setShow }) {
	const {
		bulkCreateQuestionAnswerSet,
		BulkCreateQuestionloading,
		onClickBackButton,
		control,
		errors,
		handleSubmit,
	} = useBulkCreateQuestionAnswerSet({ refetch });

	const onClose = () => {
		setShow(!show);
	};

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
						loading={BulkCreateQuestionloading}
						onClick={handleSubmit(bulkCreateQuestionAnswerSet)}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>

	);
}

export default Upload;
