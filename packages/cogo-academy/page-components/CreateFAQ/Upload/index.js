import { Button } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import styles from './style.module.css';
import useBulkCreateQuestionAnswerSet from './useBulkCreateQuestionAnswerSet';

const PAGE_MAPPING = {
	topics: {
		api          : '',
		display_name : 'Topics',
	},
	tags: {
		api          : '',
		display_name : 'Tags',
	},
	questions: {
		api          : '',
		display_name : 'Questions',
	},
};

function Upload() {
	const { general:{ query : { type } } } = useSelector((state) => (state));

	const { formState: { errors }, control, handleSubmit } = useForm();

	const obj = PAGE_MAPPING[type];
	const router = useRouter();

	const onClickBackIcon = () => {
		router.back();
	};

	const onClickCancelBtn = () => {
		router.back();
	};

	const { bulkCreateQuestionAnswerSet, BulkCreateQuestionloading } = useBulkCreateQuestionAnswerSet();

	return (
		<div className={styles.container}>
			<div role="presentation" className={styles.back_div} onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.back}>Back to Dashboard</div>
			</div>

			<div className={styles.add_topic}>
				Upload
				{' '}
				{startCase(obj?.display_name)}
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
					<div><Button size="md" themeType="secondary" onClick={onClickCancelBtn}>Cancel</Button></div>
					<div className={styles.save_btn}>
						<Button
							size="md"
							themeType="primary"
							loading={BulkCreateQuestionloading}
							onClick={handleSubmit(bulkCreateQuestionAnswerSet)}
						>
							Upload File
						</Button>
					</div>
				</div>
			</div>
		</div>

	);
}

export default Upload;
