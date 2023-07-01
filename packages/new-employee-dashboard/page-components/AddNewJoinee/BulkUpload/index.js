import { Button } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import useBulkUpload from './useBulkUpload';

function BulkUpload({ setBulkUploadComponent }) {
	const {
		bulkUploadNewHire,
		loading,
		control,
		errors,
		onClickViewSampleFile,
		handleSubmit,
	} = useBulkUpload();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					width={20}
					height={20}
					style={{ cursor: 'pointer' }}
					onClick={() => setBulkUploadComponent(false)}
				/>

				<div style={{ marginLeft: 4 }}>Back to New Hire List</div>
			</div>

			<div className={styles.title}>Upload New Hire In Bulk</div>

			<div className={styles.container2}>
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
		</div>
	);
}

export default BulkUpload;
