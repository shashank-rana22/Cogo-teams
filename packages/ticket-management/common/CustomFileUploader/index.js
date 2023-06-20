import { Upload, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import uploadFile from '../../hooks/useUploadFile';

import styles from './styles.module.css';

const FILE_URL_LAST_ELEMENT = -1;
const TOTAL_PERCENT = 100;

function CustomFileUploader(props, ref) {
	const {
		onChange,
		showProgress = true,
		defaultValues,
		multiple,
		docName,
		uploadIcon = null,
		handleProgress,
		...rest
	} = props;
	const [fileName, setFileName] = useState(null);
	const [loading, setLoading] = useState(false);
	const [urlStore, setUrlStore] = useState([]);
	const [progress, setProgress] = useState({});

	const isDefaultValues = isEmpty(defaultValues?.length);

	useEffect(() => {
		setLoading(true);
		if (typeof (defaultValues) === 'string' && !multiple && defaultValues !== undefined) {
			setFileName([{ name: defaultValues.split('/').slice(FILE_URL_LAST_ELEMENT).join('') }]);
			setUrlStore([{
				fileName : defaultValues.split('/').slice(FILE_URL_LAST_ELEMENT).join(''),
				finalUrl : defaultValues,
			}]);
		}
		if (multiple && typeof (defaultValues) !== 'string' && defaultValues !== undefined) {
			const names = defaultValues.map((url) => ({ name: url.split('/').slice(FILE_URL_LAST_ELEMENT).join('') }));
			const urls = defaultValues.map((url) => ({
				fileName: url.split('/')
					.slice(FILE_URL_LAST_ELEMENT).join(''),
				finalUrl: url,
			}));

			setFileName(names);
			setUrlStore(urls);
		}
		setLoading(false);
	}, [isDefaultValues, defaultValues, multiple]);

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [urlStore, multiple, onChange]);

	useEffect(() => {
		handleProgress(loading);
	}, [loading, handleProgress]);

	const onUploadProgress = (index) => (file) => {
		setProgress((previousProgress) => ({
			...previousProgress,
			[`${index}`]: (() => {
				const { loaded, total } = file;
				const percentCompleted = Math.floor((loaded * TOTAL_PERCENT) / total);

				return percentCompleted;
			})(),
		}));
	};

	const handleChange = async (values) => {
		try {
			setLoading(true);

			if (!isEmpty(values.length)) {
				setProgress({});

				const promises = values.map((value, index) => uploadFile(index)(value, onUploadProgress));

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
