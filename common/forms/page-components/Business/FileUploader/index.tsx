/* eslint-disable no-await-in-loop */
import { Upload, Toast } from '@cogoport/components';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { publicRequest, request } from '@cogoport/request';
import React, { useState, useEffect } from 'react';

import useInterval from '../../../hooks/useInterval';

import styles from './styles.module.css';

function FileUploader(props: any) {
	const {
		uploadedFilesList: filesList,
		value,
		onChange,
		onlyURLOnChange,
		showProgress,
		multiple,
		docName,
		maxSize = '',
		...rest
	} = props;

	const [percent, setPercent] = useState(0);
	const [fileName, setFileName] = useState(null);
	const [loading, setLoading] = useState(true);
	const [urlStore, setUrlStore] = useState([]);

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[0]);
		}
	}, [urlStore]);

	let i = 0;
	const uploadFile = async (file:any) => {
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
	useInterval(() => {
		if (percent > 0 && percent < 95) {
			setPercent(percent + 3);
		}
	}, 120);

	const handleChange = async (values: any) => {
		setPercent(10);
		const promises = [];
		while (i < values.length) {
			try {
				promises.push(uploadFile(values[i]));
			} catch (err) {
				setPercent(0);
				Toast.error('File Upload failed.......');
			}
			i += 1;
		}
		setFileName(values);
		const allUrls = await Promise.all(promises);
		setUrlStore((previousState) => [...previousState, allUrls]);
		setPercent(100);
		setLoading(false);
	};

	console.log('urlStoreee', urlStore);

	return (
		<>
			<Upload
				{...rest}
				value={fileName}
				multiple={multiple}
				onChange={handleChange}
				loading={loading}
				multipleUploadDesc="upload your files here"
				uploadIcon={<IcMUpload height={40} width={40} />}
				fileData={urlStore[0]}
			/>
			{(percent > 0 && percent < 100) && (
				<div className={styles.progress_container}>
					<IcMDocument
						style={{ height: '30', width: '30', color: '#2C3E50' }}
					/>
					<div>
						<div className={styles.file_name}>{`File uploading (${percent}%)...`}</div>
						<div className={styles.progressBar}>
							<div
								className={styles.progress}
								style={{ width: `${percent}%` }}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default FileUploader;
