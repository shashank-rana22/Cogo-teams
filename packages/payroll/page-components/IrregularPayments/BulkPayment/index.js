import { Button } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { IcM1, IcM2, IcMDownload, IcMError } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import useGetErrorReport from '../../../hooks/useGetErrorReport';
import useGetIrregularPaymentsReport from '../../../hooks/useGetIrregularPaymentsReport';
import useGetUploadIrregularPaymentsReport from '../../../hooks/useGetUploadIrregularPaymentsReport';

import styles from './styles.module.css';

function BulkPayment({ control = () => {}, watch = () => {}, setFileErrors = () => {} }) {
	const { getIrregularPaymentsReport } = useGetIrregularPaymentsReport();
	const handleDownload = () => {
		getIrregularPaymentsReport();
	};

	const { data: errorData, getUploadIrregularPaymentsReport } = useGetUploadIrregularPaymentsReport();
	const file = watch('upload');
	useEffect(() => {
		if (file) {
			getUploadIrregularPaymentsReport(file);
		}
	}, [file, getUploadIrregularPaymentsReport]);

	const { getErrorReport } = useGetErrorReport();
	const handleDownloadReport = () => {
		getErrorReport(file);
	};

	useEffect(() => {
		if (errorData) {
			setFileErrors(errorData.total_error_count);
		}
	}, [errorData, setFileErrors]);

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.head_container}>
					<span className={styles.heading}>Bulk Payment Upload</span>
					<span className={styles.subheading}>Upload excel to add multiple payments</span>
				</div>
				<div>
					<div className={styles.step}>
						<IcM1 width={14} height={14} className={styles.icon} />
						<span className={styles.step_text}>STEP 1</span>
					</div>
					<div className={styles.download_flex}>
						<div className={styles.head_container}>
							<span className={styles.download_excel}>Download Excel Template</span>
							<span className={styles.subheading}>
								Fill the downloaded excel with your details and upload it here
							</span>
						</div>
						<Button size="md" themeType="secondary" onClick={handleDownload}>
							<div className={styles.button_container}>
								<IcMDownload width={14} height={14} />
								<span className={styles.button_text}>Download Template</span>
							</div>
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.bottom_container}>
				<div className={styles.step}>
					<IcM2 width={14} height={14} className={styles.icon} />
					<span className={styles.step_text}>STEP 1</span>
				</div>
				<div className={styles.upload_flex}>
					<span className={styles.upload_text}>Upload Excel Template</span>
					<div
						className={styles.upload_container}
					>
						<UploadController
							name="upload"
							control={control}
							type="input"
							accept=".csv"
							className={styles.upload}
						/>
					</div>
					<span className={styles.subheading}>
						{!file ? 'Upload the excel template with the new data' : 'Uploaded successfully'}
					</span>
				</div>
				{
					(errorData?.total_error_count) ? (
						<div className={styles.error_container}>
							<div className={styles.right}>
								<IcMError width={22} height={22} />
								<div className={styles.error}>
									<span className={styles.error_found}>
										{errorData?.total_error_count}
										{' '}
										Errors found
									</span>
									<span className={styles.solve_steps}>
										{'Please download error report > fix errors > re-upload file'}
									</span>
								</div>
							</div>

							<Button size="md" themeType="secondary" onClick={handleDownloadReport}>
								<div className={styles.button_container}>
									<IcMDownload width={14} height={14} />
									<span className={styles.error_button_text}>Get Error Report</span>
								</div>
							</Button>
						</div>
					) : null
				}
			</div>
		</div>
	);
}

export default BulkPayment;
