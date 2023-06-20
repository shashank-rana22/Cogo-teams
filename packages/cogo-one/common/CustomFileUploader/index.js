import { Upload, Toast } from '@cogoport/components';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { publicRequest, request } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import UPLOAD_VALIDATION_MAPPING from '../../constants/UPLOAD_VALIDATION_MAPPING';

import styles from './styles.module.css';

function CustomFileUploader(props, ref) {
	const {
		onChange,
		showProgress = true,
		defaultValues,
		multiple,
		docName,
		uploadIcon = null,
		handleProgress,
		channel = '',
		...rest
	} = props;
	const [fileName, setFileName] = useState(null);
	const [loading, setLoading] = useState(false);
	const [urlStore, setUrlStore] = useState([]);
	const [progress, setProgress] = useState({});

	useEffect(() => {
		setLoading(true);
		if (typeof (defaultValues) === 'string' && !multiple && defaultValues !== undefined) {
			setFileName([{ name: defaultValues.split('/').slice(-1).join('') }]);
			setUrlStore([{
				fileName : defaultValues.split('/').slice(-1).join(''),
				finalUrl : defaultValues,
			}]);
		}
		if (multiple && typeof (defaultValues) !== 'string' && defaultValues !== undefined) {
			const names = defaultValues.map((url) => ({ name: url.split('/').slice(-1).join('') }));
			const urls = defaultValues.map((url) => ({ fileName: url.split('/').slice(-1).join(''), finalUrl: url }));

			setFileName(names);
			setUrlStore(urls);
		}
		setLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues?.length > 0]);

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

		return finalUrl;
	};

	const handleChange = async (values) => {
		let channelTemp = 'default';
		if (channel in UPLOAD_VALIDATION_MAPPING) {
			channelTemp = channel;
		}
		const isValid = UPLOAD_VALIDATION_MAPPING[channelTemp]?.({ values });

		if (!isValid) {
			return;
		}

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

	const handleDelete = (values) => {
		setFileName(values);
		const files = values.map((item) => item.name);
		const newUrls = urlStore.filter((item) => files.includes(item.fileName));
		setUrlStore(newUrls);
	};
	const externalHandleDelete = (val) => {
		setUrlStore(val);
	};

	useImperativeHandle(ref, () => ({
		externalHandleDelete,
	}));
	return (
		<>
			<Upload
				{...rest}
				value={fileName}
				multiple={multiple}
				onChange={handleChange}
				onClick={handleDelete}
				loading={loading}
				uploadDesc="Upload files"
				uploadIcon={uploadIcon || <IcMUpload height={40} width={40} />}
				fileData={urlStore}
			/>

			{showProgress && loading && !isEmpty(progress) && Object.keys(progress).map((key) => (
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

export default forwardRef(CustomFileUploader);
