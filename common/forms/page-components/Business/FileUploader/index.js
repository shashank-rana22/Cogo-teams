import { Upload, Toast } from '@cogoport/components';
import { IcMDocument, IcMCloudUpload } from '@cogoport/icons-react';
import { publicRequest, request } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

const EMPTY_VALUES_LENGTH = 0;
const URL_SPLIT_FIRST = 0;
const FILE_NAME_IN_URL_SLICE_INDEX = -1;
const EMPTY_DEFAULT_VALUES_LENGTH = 0;
const URL_STORE_FIRST = 0;
const PERCENT_FACTOR = 100;

function FileUploader(props) {
	const {
		onChange,
		defaultValues,
		multiple,
		docName,
		uploadIcon = null,
		uploadDesc = '',
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
				name: url?.split('/')?.slice(FILE_NAME_IN_URL_SLICE_INDEX)?.join(''),
			}));
			const urls = defaultValues.map((url) => ({
				fileName : url?.split('/')?.slice(FILE_NAME_IN_URL_SLICE_INDEX)?.join(''),
				finalUrl : url,
			}));

			setFileName(names);
			setUrlStore(urls);
		}
		setLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues?.length > EMPTY_DEFAULT_VALUES_LENGTH]);

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[URL_STORE_FIRST]);
		}
	}, [multiple, urlStore, onChange]);

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

		const finalUrl = url.split('?')[URL_SPLIT_FIRST];

		return finalUrl;
	};

	const handleChange = async (values) => {
		try {
			setLoading(true);

			if (values.length > EMPTY_VALUES_LENGTH) {
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
						
						const prevValue = prev?.target?.value
						const finalPrevValue= Array.isArray(prevValue) || typeof prevValue === 'object' ? prevValue : [prevValue||'']
						const t=[...finalPrevValue, ...values] 
						console.log({t})
						return t;
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