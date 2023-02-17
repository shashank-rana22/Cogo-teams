import { Upload, Toast } from '@cogoport/components';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { publicRequest, request } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

function FileUploader(props) {
	const {
		onChange,
		showProgress = true,
		multiple,
		docName,
		uploadIcon = null,
		handleProgress,
		...rest
	} = props;

	const [fileName, setFileName] = useState(null); // remove
	const [loading, setLoading] = useState(false); // remove
	const [urlStore, setUrlStore] = useState([]);
	const [progress, setProgress] = useState({});

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[0]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [urlStore]);

	useEffect(() => {
		handleProgress(loading);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const onUploadProgress = (index) => (file) => {
		setProgress((previousProgress) => ({
			...previousProgress,
			[`${index}`]: (() => {
				const { loaded, total } = file;
				const percentCompleted = Math.floor((loaded * 100) / total);

				return percentCompleted;
			})(),
		}));
	};

	const uploadFile = (index) => async (file) => {
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
			onUploadProgress: onUploadProgress(index),
		});

		const finalUrl = url.split('?')[0];

		return {
			fileName: file.name,
			finalUrl,
		};
	};

	const handleChange = async (values) => {
		try {
			setLoading(true);

			if (values.length > 0) {
				setProgress({});

				const promises = values.map((value, index) => uploadFile(index)(value));

				const allUrls = await Promise.all(promises);

				setUrlStore(allUrls);
				setFileName(values);
			}
		} catch (error) {
			Toast.error('File Upload failed.......');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Upload
				{...rest}
				value={fileName}
				multiple={multiple}
				onChange={handleChange}
				loading={loading}
				multipleUploadDesc="Upload files"
				uploadIcon={uploadIcon || <IcMUpload height={40} width={40} />}
				fileData={urlStore}
			/>

			{showProgress && loading && !isEmpty(progress) && Object.keys(progress).map((key) => (
				<div className={styles.progress_container}>
					<IcMDocument
						style={{ height: '30', width: '30', color: '#2C3E50' }}
					/>
					<div>
						<div className={styles.file_name}>
							{`File uploading (${progress[key]}%)...`}
						</div>
						<div className={styles.progress_bar}>
							<div
								className={styles.progress}
								style={{ width: `${progress[key]}%` }}
							/>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default FileUploader;
