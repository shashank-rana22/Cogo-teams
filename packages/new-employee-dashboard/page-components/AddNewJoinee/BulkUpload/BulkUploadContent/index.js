import { Button } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import INSTRUCTIONS from './instructions';
import styles from './styles.module.css';

function BulkUploadContent(props) {
	const {
		bulkUploadNewHire,
		loading,
		control,
		errors,
		onClickViewSampleFile,
		handleSubmit,
		setBulkUploadComponent,
		activeTab,
	} = props || {};

	return (
		<div className={styles.container}>
			<div className={styles.guide_title}>
				Bulk
				{' '}
				{startCase(activeTab)}
				{' '}
				Guide
			</div>

			{(INSTRUCTIONS[activeTab] || []).map((instruction) => (
				<div key={instruction} className={styles.instruction}>{instruction}</div>
			))}

			<div className={styles.upload_new_hire}>Upload New Hire Sheet</div>

			<div className={styles.uploader}>
				<UploadController
					control={control}
					errors={errors}
					name="upload_new_hire_info"
					accept=".csv"
					rules={{ required: 'File is required.' }}
				/>

				{errors.upload_new_hire_info && (
					<div className={styles.error_msg}>
						{errors.upload_new_hire_info.message}
					</div>
				)}
			</div>

			<div className={styles.btn_row}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setBulkUploadComponent(false)}
				>
					Cancel
				</Button>

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
					loading={loading}
					onClick={handleSubmit(bulkUploadNewHire)}
				>
					Upload File
				</Button>
			</div>
		</div>
	);
}

export default BulkUploadContent;
