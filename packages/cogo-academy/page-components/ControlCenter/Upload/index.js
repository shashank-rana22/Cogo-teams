import { Button } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './style.module.css';
import useBulkCreateQuestionAnswerSet from './useBulkCreateQuestionAnswerSet';

function Upload() {
	const {
		bulkCreateQuestionAnswerSet,
		BulkCreateQuestionloading,
		onClickBackButton,
		pageType,
		control,
		errors,
		onClickViewSampleFile,
		handleSubmit,
	} = useBulkCreateQuestionAnswerSet();

	return (
		<div className={styles.container}>
			<div role="presentation" className={styles.back_div} onClick={onClickBackButton}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.back}>Back to Dashboard</div>
			</div>

			<div className={styles.add_topic}>
				Upload
				{' '}
				{startCase(pageType?.display_name)}
				{' '}
				In Bulk
			</div>

			<div className={styles.container2}>
				<div className={styles.upload_faq}>Upload FAQ Sheet</div>

				<div className={styles.uploader}>
					<UploadController
						control={control}
						errors={errors}
						name="upload_question"
						accept=".csv"
						rules={{ required: 'File is required.' }}

					/>

					{errors.upload_question && (
						<div className={styles.error_msg}>
							{errors.upload_question.message}
						</div>
					)}
				</div>

				<div className={styles.btn_row}>
					<Button size="md" themeType="tertiary" onClick={onClickBackButton}>Cancel</Button>

					<Button
						size="md"
						themeType="secondary"
						style={{ marginLeft: 10 }}
						onClick={onClickViewSampleFile}
					>
						View Sample Bulk Upload File
					</Button>

					<Button
						size="md"
						themeType="primary"
						style={{ marginLeft: 10 }}
						loading={BulkCreateQuestionloading}
						onClick={handleSubmit(bulkCreateQuestionAnswerSet)}
					>
						Upload File
					</Button>
				</div>
			</div>
		</div>

	);
}

export default Upload;
