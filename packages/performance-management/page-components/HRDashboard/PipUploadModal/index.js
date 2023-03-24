import { Tooltip, Toast, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function PipUloadModal({ setModal = () => {} }) {
	const [files, setFiles] = useState({});
	const [type, setType] = useState('');

	// const [{ loading : uploadLoading = false }, trigger] = useIrisRequest({
	// 	url    : 'post_iris_approve_ratings',
	// 	method : 'post',
	// }, { manual: true });

	const { control, watch, formState:{ errors } } = useForm();

	const onboardingCsvFile = watch('onboarding_url');
	// const normalizationCsvFile = watch('normalization_url');

	useEffect(() => setFiles({
		onboardingCSV: onboardingCsvFile || undefined,
	}), [onboardingCsvFile]);

	// const isUploadPossible = files.onboardingCSV || month;
	const isUploadPossible = true;

	const uploadCSVs = async () => {
		try {
			// await trigger({ data: { Url: files.normalizationCSV, Month: month, Year: year.toString() } });

			Toast.success('File sent for processing. Please check after some time...');
			setFiles({});
			setModal('');
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	const downloadOnboardingSample = () => {
		// eslint-disable-next-line max-len, no-undef
		// window.open('https://cogoport-testing.sgp1.digitaloceanspaces.com/b633a4b840f422d51aaf1b3c1cd4ddd5/sample_ratings_sheet.csv', '_blank');
	};

	const getToolTip = (text) => <div className={styles.tooltip_text}>{text}</div>;

	return (
		<div className={styles.upload_container}>
			<div className={styles.upload_info} style={{ background: files.normalizationCSV ? '#e0e0e0' : '' }}>
				{type ? (
					<div>
						<div className={styles.upload_header}>
							<div className={styles.label}>
								{type === 'pip' ? 'Upload PIP CSV' : 'Upload Probation CSV'}
							</div>
							<Tooltip
								theme="light"
								placement="top-end"
								animation="shift-away"
								content={getToolTip('Get Sample PIP csv')}
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
						/>
					</div>
				) : (
					<div>
						<p style={{ padding: '8px' }}>What do you wish to upload CSV for?</p>
						<div className={styles.pip_select}>
							<Button
								size="xl"
								className={styles.pip_select_btn}
								themeType="secondary"
								onClick={() => setType('probations')}
								style={{ width: '120px' }}
							>
								Probations

							</Button>
							<Button
								size="xl"
								className={styles.pip_select_btn}
								themeType="secondary"
								onClick={() => setType('pip')}
								style={{ width: '120px' }}
							>
								PIP
							</Button>
						</div>
					</div>
				)}
			</div>
			{type ? (
				<div className={styles.submit}>
					<Button
						themeType="secondary"
						onClick={() => setType('')}
						style={{ marginRight: '8px' }}
					>
						Back
					</Button>
					<Button
						themeType="primary"
						onClick={() => uploadCSVs()}
						disabled={!isUploadPossible || isEmpty(files?.normalizationCSV)}
					>
						Submit
					</Button>
				</div>
			)
				: (
					<div className={styles.submit}>

						<Button
							themeType="secondary"
							onClick={() => setModal('')}
							style={{ marginRight: '8px' }}
						>
							Close
						</Button>
					</div>
				)}
		</div>
	);
}

export default PipUloadModal;
