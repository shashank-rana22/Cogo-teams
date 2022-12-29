/* eslint-disable no-await-in-loop */
import { Upload, Toast } from '@cogoport/components';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { useRequest, publicRequest, request } from '@cogoport/request';
import React, { useState, useEffect } from 'react';

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
	const done = 10;
	const uploadFile = async (file:any) => {
		console.log('file', file);
		const { data } = await request({
			method : 'GET',
			url    : '/get_media_upload_url',
			params : {
				file_name: new Date().getTime(),
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
		return url.split('?')[0];
	};

	const handleChange = async (values: any) => {
		setPercent(done);
		const promises = [];
		while (i < values.length) {
			setPercent(done + (20 * i));
			try {
				promises.push(uploadFile(values[i]));
			} catch (err) {
				Toast.error('File Upload failed.......');
			}
			i += 1;
		}
		setFileName(values);
		const allUrls = await Promise.all(promises);
		console.log('urlssss', { allUrls });
		setUrlStore((previousState) => [...previousState, allUrls]);
		setPercent(100);
		setLoading(false);
	};
	// try {
	// 	const { data } = await request({
	// 		method : 'GET',
	// 		url    : '/get_media_upload_url',
	// 		params : {
	// 			file_name: new Date().getTime(),
	// 		},
	// 	});
	// 	const { url } = data;
	// 	try {
	// 		promises.push(
	// 			publicRequest({
	// 				url,
	// 				data    : values[i],
	// 				method  : 'PUT',
	// 				headers : {
	// 					'Content-Type': values[i].type,
	// 				},
	// 			})
	// 				.then(() => url.split('?')[0]),
	// 		);
	// 		setPercent(done + (50 * i));
	// 	} catch (err) {
	// 		console.log({ err });
	// 	}
	// 	setFileName(values);
	// 	// setUrlStore((previousState) => [...previousState, url]);
	// 	i += 1;
	// } catch (err:any) {
	// 	Toast.error('File Upload failed.......');
	// }

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
