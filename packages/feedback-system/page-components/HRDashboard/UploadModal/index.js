import { Select, Tooltip, Toast, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';
import { IcMInfo } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { getMonth, getYear, isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const allMonthOptions = [
	{ label: 'January', value: 'January', index: 1 },
	{ label: 'February', value: 'February', index: 2 },
	{ label: 'March', value: 'March', index: 3 },
	{ label: 'April', value: 'April', index: 4 },
	{ label: 'May', value: 'May', index: 5 },
	{ label: 'June', value: 'June', index: 6 },
	{ label: 'July', value: 'July', index: 7 },
	{ label: 'August', value: 'August', index: 8 },
	{ label: 'September', value: 'September', index: 9 },
	{ label: 'October', value: 'October', index: 10 },
	{ label: 'November', value: 'November', index: 11 },
	{ label: 'December', value: 'December', index: 12 },
];

const getMonthYearOptions = (year) => {
	const currentDate = new Date();
	const currentMonth = getMonth(currentDate);
	const currentYear = getYear(currentDate);

	const yearOptions = [
		{ label: `${currentYear}`, value: currentYear },
		{ label: `${currentYear - 1}`, value: currentYear - 1 },
		{ label: `${currentYear - 2}`, value: currentYear - 2 },
	];

	let monthOptions = allMonthOptions;

	if (year === currentYear) {
		monthOptions = monthOptions.filter((m) => m.index < currentMonth + 1);
	}

	return { yearOptions, monthOptions };
};

function UploadModalBody({ setOpenUploadModal = () => {} }) {
	const [files, setFiles] = useState({});
	const [year, setYear] = useState('');
	const [month, setMonth] = useState('');

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

	const { monthOptions, yearOptions } = getMonthYearOptions(year);

	const isUploadPossible = files.onboardingCSV || month;

	const uploadCSVs = async () => {
		try {
			await trigger({ data: { Url: files.normalizationCSV, Month: month, Year: year } });

			Toast.success('File sent for processing. Please check after some time...');
			setFiles({});
			setOpenUploadModal(false);
		} catch (e) {
			Toast.error(e);
		}
	};

	const downloadRatingSample = () => {
		// eslint-disable-next-line max-len, no-undef
		window.open('https://cogoport-testing.sgp1.digitaloceanspaces.com/d10cedfc002f5dca2be438cf0dc2b3f0/sample_ratings_sheet%20%287%29.csv');
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

					<div className={styles.filters}>
						<Select
							value={year}
							onChange={setYear}
							placeholder="Year..."
							isClearable={!month}
							style={{ marginRight: '8px' }}
							options={yearOptions}
						/>
						<Select
							value={month}
							onChange={setMonth}
							placeholder="Month..."
							disabled={!year}
							isClearable
							options={monthOptions}
						/>
					</div>

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
					disabled={!isUploadPossible}
				>
					Upload
				</Button>
			</div>
		</div>
	);
}

export default UploadModalBody;
