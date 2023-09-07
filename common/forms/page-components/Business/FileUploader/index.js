import { Upload, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMCloudUpload } from '@cogoport/icons-react';
import { publicRequest, request } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const FILE_NAME_IN_URL_SLICE_INDEX = -1;
const PERCENT_FACTOR = 100;
const ONE_MEGA_BYTE = Number(GLOBAL_CONSTANTS.options.upload_file_size['1MB']);
const TIMEOUT_DURATION = 10;
const MAXIMUM_UPLOAD_SIZE = Number(GLOBAL_CONSTANTS.options.upload_file_size['20MB']);

function FileUploader(props) {
	const {
		onChange,
		defaultValues,
		multiple,
		docName,
		uploadIcon = null,
		uploadDesc = '',
		maxSize = MAXIMUM_UPLOAD_SIZE,
		...rest
	} = props;
	const [fileName, setFileName] = useState(null); // remove
	const [loading, setLoading] = useState(true); // remove
	const [urlStore, setUrlStore] = useState([]);
	const [progress, setProgress] = useState({});

	useEffect(() => {
		setLoading(true);
		if (typeof (defaultValues) === 'string' && !multiple && defaultValues !== undefined) {
			setFileName([{ name: defaultValues.split('/').slice(FILE_NAME_IN_URL_SLICE_INDEX).join('') }]);
			setUrlStore([{
				fileName : defaultValues.split('/').slice(FILE_NAME_IN_URL_SLICE_INDEX).join(''),
				finalUrl : defaultValues,
			}]);
		}
		if (multiple && typeof (defaultValues) !== 'string' && defaultValues !== undefined) {
			const names = defaultValues.map((url) => ({
				name: (url?.finalUrl || url)?.split('/')?.slice(FILE_NAME_IN_URL_SLICE_INDEX)?.join(''),
			}));
			const urls = defaultValues.map((url) => ({
				fileName : (url?.finalUrl || url)?.split('/')?.slice(FILE_NAME_IN_URL_SLICE_INDEX)?.join(''),
				finalUrl : url,
			}));

			setFileName(names);
			setUrlStore(urls);
		}
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [!isEmpty(defaultValues)]);

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[GLOBAL_CONSTANTS.zeroth_index]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [multiple, urlStore]);

	const onUploadProgress = (index) => (file) => {
		setProgress((previousProgress) => ({
			...previousProgress,
			[`${index}`]: (() => {
				const { loaded, total } = file;
				const percentCompleted = Math.floor((loaded * PERCENT_FACTOR) / total);

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

		const finalUrl = url.split('?')[GLOBAL_CONSTANTS.zeroth_index];

		return finalUrl;
	};

	const handleChange = async (values) => {
		try {
			setLoading(true);

			if (values?.length) {
				setProgress({});

				const filteredValues = values.filter((item) => {
					const THRESHOLD_SIZE = Number(maxSize) / ONE_MEGA_BYTE;

					if (item.size > Number(maxSize)) {
						setTimeout(() => {
							Toast.error(`The size of ${item.name} is greater than ${THRESHOLD_SIZE} MB.
							Please upload a file with size less than ${THRESHOLD_SIZE} MB`);
						}, TIMEOUT_DURATION);
					}
					return item.size < Number(maxSize);
				});

				const promises = filteredValues.map((value, index) => uploadFile(index)(value));

				const allUrls = await Promise.all(promises);

				if (multiple) {
					setUrlStore((prev) => {
						if (prev === null) { return allUrls; }
						return [...prev, ...allUrls];
					});
					setFileName((prev) => {
						if (prev === null) return filteredValues;
						let prevValue = [];

						if (typeof prev !== 'object' || !Array.isArray(prev)) { prevValue = prev?.target?.value || []; }

						return [...prevValue, ...filteredValues];
					});
				} else {
					setUrlStore(allUrls);
					setFileName(filteredValues);
				}
			}
		} catch (error) {
			Toast.error('File Upload failed.......');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = (values) => {
		setFileName(values);
		const files = Array.isArray(values) ? values?.map((item) => item.name) : [];
		const newUrls = urlStore.filter((item) => files.includes(item.fileName));
		setUrlStore(newUrls);
	};

	return (
		<>
			<Upload
				{...rest}
				value={fileName}
				multiple={multiple}
				onChange={handleChange}
				onClick={handleDelete}
				loading={loading}
				uploadDesc={uploadDesc || 'Upload files'}
				uploadIcon={uploadIcon || <IcMCloudUpload color="#ACDADF" height={40} width={40} />}
				fileData={urlStore}
			/>

			{loading && !isEmpty(progress) && Object.keys(progress).map((key) => (
				<div className={styles.progress_container} key={key}>
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
