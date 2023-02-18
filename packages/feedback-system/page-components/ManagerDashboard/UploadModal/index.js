import { Toast, Button, Upload } from '@cogoport/components';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { useRequest, request, publicRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function UploadModalBody({ setOpenUploadModal = () => {} }) {
	const [files, setFiles] = useState({}); // remove
	const [loading, setLoading] = useState(true); // remove
	const [urlStore, setUrlStore] = useState([]);

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
		try {
			await request({
				method : 'get',
				url    : '/list_feedback_questions',
				params : { files },
			});

			Toast.success('Files sent for processing. Please check after some time...');
			setFiles({});
			setOpenUploadModal(false);
		} catch (e) {
			Toast.error(e.toString());
		}
	};

	return (
		<div className={styles.upload_container}>
			<div className={styles.upload_info}>
				<div className={styles.label}>Upload Onboarding CSV</div>
				<Upload
					value={files.onboardingCSV}
					onChange={(values) => handleChange(values, 'onboardingCSV')}
					uploadIcon={<IcMUpload height={40} width={40} />}
					fileData={urlStore}
					loading={loading.onboardingCSV}
					accept=".csv"
					style={{ height: 'fit-content' }}
				/>
			</div>
			<div className={styles.upload_info}>
				<div className={styles.label}>Upload Normalization CSV</div>
				<Upload
					value={files.normalizationCSV}
					onChange={(values) => handleChange(values, 'normalizationCSV')}
					uploadIcon={<IcMUpload height={40} width={40} />}
					fileData={urlStore}
					loading={loading.normalizationCSV}
					accept=".csv"
					style={{ height: 'fit-content' }}
				/>
			</div>

			<div className={styles.submit}>
				<Button onClick={() => uploadCSVs()}>Upload</Button>
			</div>
		</div>
	);
}

export default UploadModalBody;
