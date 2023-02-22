import { Tooltip, Toast, Button, Upload } from '@cogoport/components';
import { IcMInfo, IcMUpload } from '@cogoport/icons-react';
import { useRequest, request, publicRequest } from '@cogoport/request';
import { useState } from 'react';

import styles from './styles.module.css';

function UploadModalBody({ setOpenUploadModal = () => {} }) {
	const [files, setFiles] = useState({}); // remove
	const [loading, setLoading] = useState(true); // remove
	const [urlStore, setUrlStore] = useState([]);

	const [{ loading : uploadLoading = false }, trigger] = useRequest({
		url    : 'approve-ratings',
		method : 'post',
	}, { manual: true });

	const uploadFile = async (file) => {
		const { data } = await request({
			method : 'GET',
			url    : '/get_media_upload_url',
			params : {
				file_name: file.name,
			},
		});

		const { url, headers } = data;

		await publicRequest({
			url,
			data    : file,
			method  : 'PUT',
			headers : {
				...headers,
				'Content-Type': file.type,
			},
		});

		const finalUrl = url.split('?')[0];

		return {
			fileName: file.name,
			finalUrl,
		};
	};

	const handleChange = async (values, type) => {
		try {
			setLoading((pv) => ({ ...pv, [type]: true }));

			if (values.length > 0) {
				const promises = values.map((value) => uploadFile(value, type));

				const allUrls = await Promise.all(promises);

				setUrlStore(allUrls);
				setFiles({ ...files, [type]: values });
			}
		} catch (error) {
			Toast.error('File Upload failed.......');
		} finally {
			setLoading((pv) => ({ ...pv, [type]: false }));
		}
	};

	const uploadCSVs = async () => {
		let fileUrl;
		urlStore.forEach((file) => { fileUrl = file.finalUrl; });

		try {
			await trigger({ data: { Url: fileUrl } });

			Toast.success('File sent for processing. Please check after some time...');
			setFiles({});
			setOpenUploadModal(false);
		} catch (e) {
			Toast.error(e.toString());
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

				<Upload
					value={files.onboardingCSV}
					onChange={(values) => handleChange(values, 'onboardingCSV')}
					uploadIcon={<IcMUpload height={40} width={40} />}
					fileData={urlStore}
					loading={loading.onboardingCSV}
					accept=".csv"
					style={{ height: 'fit-content' }}
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

				<Upload
					value={files.normalizationCSV}
					onChange={(values) => handleChange(values, 'normalizationCSV')}
					uploadIcon={<IcMUpload height={40} width={40} />}
					fileData={urlStore}
					loading={loading.normalizationCSV}
					accept=".csv"
					style={{ height: 'fit-content' }}
					disabled={files.onboardingCSV}
				/>
			</div>

			<div className={styles.submit}>
				<Button onClick={() => uploadCSVs()} loading={uploadLoading}>Upload</Button>
			</div>
		</div>
	);
}

export default UploadModalBody;
