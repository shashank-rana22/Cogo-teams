import { Tooltip, Toast, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcMInfo } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function UploadModalBody({ setOpenUploadModal = () => {} }) {
	const [files, setFiles] = useState({});

	const [{ loading : uploadLoading = false }, trigger] = useRequest({
		url    : 'approve_ratings',
		method : 'post',
	}, { manual: true });

	const { control, watch, formState:{ errors } } = useForm();

	const onboardingCsvFile = watch('onboarding_url');
	const normalizationCsvFile = watch('normalization_url');

	useEffect(() => setFiles({
		onboardingCSV    : onboardingCsvFile || undefined,
		normalizationCSV : normalizationCsvFile || undefined,
	}), [onboardingCsvFile, normalizationCsvFile]);

	const uploadCSVs = async () => {
		try {
			await trigger({ data: { Url: files.normalizationCSV } });

			Toast.success('File sent for processing. Please check after some time...');
			setFiles({});
			setOpenUploadModal(false);
		} catch (e) {
			Toast.error(e);
		}
	};

	const downloadRatingSample = () => {
		// eslint-disable-next-line max-len, no-undef
		window.open('https://cogoport-testing.sgp1.digitaloceanspaces.com/b633a4b840f422d51aaf1b3c1cd4ddd5/sample_ratings_sheet.csv', '_blank');
	};

	const downloadOnboardingSample = () => {
		// eslint-disable-next-line max-len, no-undef
		// window.open('https://cogoport-testing.sgp1.digitaloceanspaces.com/b633a4b840f422d51aaf1b3c1cd4ddd5/sample_ratings_sheet.csv', '_blank');
	};

	const getToolTip = (text) => <div className={styles.tooltip_text}>{text}</div>;

	return (
		<div className={styles.upload_container}>
			<div className={styles.upload_info} style={{ background: files.normalizationCSV ? '#e0e0e0' : '' }}>
				<div className={styles.upload_header}>
					<div className={styles.label}>Upload Onboarding CSV</div>
					<Tooltip
						theme="light"
						placement="top-end"
						animation="shift-away"
						content={getToolTip('Get Sample Onboarding csv')}
					>
						<div
							className={styles.info_tool}
							role="button"
							onClick={() => downloadOnboardingSample()}
							tabIndex={0}
						>
							<IcMInfo width={20} height={20} />
						</div>
					</Tooltip>
				</div>

				<UploadController
					control={control}
					errors={errors}
					name="onboarding_url"
					accept=".csv"
					disabled={files.normalizationCSV}
				/>
			</div>
			<div className={styles.upload_info} style={{ background: files.onboardingCSV ? '#e0e0e0' : '' }}>
				<div className={styles.upload_header}>
					<div className={styles.label}>Upload Normalization CSV</div>
					<Tooltip
						theme="light"
						placement="top-end"
						animation="shift-away"
						content={getToolTip('Get Sample Normalization csv')}
					>
						<div
							className={styles.info_tool}
							role="button"
							onClick={() => downloadRatingSample()}
							tabIndex={0}
						>
							<IcMInfo width={20} height={20} />
						</div>
					</Tooltip>
				</div>

				<UploadController
					control={control}
					errors={errors}
					name="normalization_url"
					accept=".csv"
					disabled={files.onboardingCSV}
					uploadType="aws"
				/>
			</div>

			<div className={styles.submit}>
				<Button
					onClick={() => uploadCSVs()}
					loading={uploadLoading}
					disabled={isEmpty(files?.normalizationCSV)}
				>
					Upload
				</Button>
			</div>
		</div>
	);
}

export default UploadModalBody;
