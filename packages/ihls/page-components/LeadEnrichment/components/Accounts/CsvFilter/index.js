import { Button, Modal, Toast } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';

import styles from './styles.module.css';

function CsvFilter({ setParams = () => {}, loading = false, showCsv = {}, setShowCsv = () => {} }) {
	const onClickCancel = () => setShowCsv(false);

	const { formState: { errors }, control, handleSubmit } = useForm();

	const onClickUpload = async (val) => {
		try {
			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					csv_filter: val?.upload_question?.finalUrl,
				},
			}));
			onClickCancel();
		} catch (error) {
			Toast.error(error);
		}
	};

	return (
		<Modal size="md" show={showCsv} onClose={onClickCancel} placement="center">
			<Modal.Header title="More filters" />
			{/* <div className={styles.modal_container}> */}
			<Modal.Body>
				<UploadController
					control={control}
					name="upload_question"
					accept=".csv, .xlsx"
					rules={{ required: 'File is required.' }}
				/>
				{errors.upload_question && (
					<div className={styles.error_msg}>
						{errors?.upload_question?.message}
					</div>
				)}
			</Modal.Body>
			{/* </div> */}
			<Modal.Footer>
				<div className={styles.modal_footer}>
					<Button
						disabled={loading}
						onClick={handleSubmit(onClickUpload)}
						size="md"
						themeType="primary"
					>
						Apply

					</Button>
					<Button onClick={onClickCancel} size="md" themeType="secondary">Cancel</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CsvFilter;
