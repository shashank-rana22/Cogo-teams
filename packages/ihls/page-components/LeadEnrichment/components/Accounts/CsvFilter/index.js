import { Button, Modal, Toast } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';

import styles from './styles.module.css';

function CsvFilter({
	setFileName = () => {},
	setParams = () => {},
	showCsv = {},
	setShowCsv = () => {},
}) {
	const onClickCancel = () => setShowCsv(false);

	const { formState: { errors }, control, reset, watch, handleSubmit } = useForm();

	const is_file_uploaded = watch('upload_question');

	const onClickUpload = async (val) => {
		try {
			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					csv_filter: val?.upload_question?.finalUrl,
				},
			}));
			setFileName(val?.upload_question?.fileName);
			onClickCancel();
			reset();
		} catch (error) {
			Toast.error(error);
		}
	};

	return (
		<Modal size="md" show={showCsv} onClose={onClickCancel} placement="center">
			<Modal.Header title="Registration number filter" />
			<Modal.Body>
				<ul>
					<li>
						Please specify column header as
						{' '}
						<b>registration_number</b>
					</li>
				</ul>
				<UploadController
					control={control}
					name="upload_question"
					accept=".csv"
					rules={{ required: 'File is required.' }}
				/>
				{errors.upload_question && (
					<div className={styles.error_msg}>
						{errors?.upload_question?.message}
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.modal_footer}>
					<Button
						disabled={!is_file_uploaded}
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
