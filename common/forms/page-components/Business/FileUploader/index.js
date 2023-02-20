import { Upload, Toast } from '@cogoport/components';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { publicRequest, request } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

function FileUploader(props) {
	const {
		onChange,
		value:fileUrls,
		showProgress,
		multiple,
		docName,
		...rest
	} = props;
	const [fileName, setFileName] = useState(null); // remove
	const [loading, setLoading] = useState(true); // remove
	const [urlStore, setUrlStore] = useState([]);
	const [progress, setProgress] = useState({});

	useEffect(() => {
		setLoading(true);
		if (typeof (fileUrls) === 'string' && !multiple && fileUrls !== undefined) {
			setFileName([{ name: fileUrls.split('/').slice(-1).join('') }]);
			setUrlStore([{
				fileName : fileUrls.split('/').slice(-1).join(''),
				finalUrl : fileUrls,
			}]);
		}
		if (multiple && typeof (fileUrls) !== 'string' && fileUrls !== undefined) {
			const names = fileUrls.map((url) => ({ name: url.split('/').slice(-1).join('') }));
			const urls = fileUrls.map((url) => ({ fileName: url.split('/').slice(-1).join(''), finalUrl: url }));

			setFileName(names);
			setUrlStore(urls);
		}
		setLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileUrls?.length > 0]);

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[0]);
		}
	}, [multiple, urlStore, onChange]);

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

				if (multiple) {
					setUrlStore((prev) => {
						if (prev === null) { return allUrls; }
						return [...prev, ...allUrls];
					});
					setFileName((prev) => {
						if (prev === null) return values;
						return [...prev, ...values];
					});
				} else {
					setUrlStore(allUrls);
					setFileName(values);
				}
			}
		} catch (error) {
			Toast.error('File Upload failed.......');
		} finally {
			setLoading(false);
		}
	};

	console.log(fileName);

	return (
		<>
			<Upload
				{...rest}
				value={fileName}
				multiple={multiple}
				onChange={handleChange}
				loading={loading}
				uploadDesc="Upload files"
				uploadIcon={<IcMUpload height={40} width={40} />}
				fileData={urlStore}
			/>

			{loading && !isEmpty(progress) && Object.keys(progress).map((key) => (
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
