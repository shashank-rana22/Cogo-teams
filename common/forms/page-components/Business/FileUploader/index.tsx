/* eslint-disable no-await-in-loop */
import { Upload, Toast } from '@cogoport/components';
import { IcMDocument, IcMUpload } from '@cogoport/icons-react';
import { useRequest, usePublicRequest } from '@cogoport/request';
import React, { useState, useRef, useEffect } from 'react';

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
	const previousValue = useRef(null);

	useEffect(() => {
		if (multiple) {
			onChange(urlStore);
		} else {
			onChange(urlStore[0]);
		}
	}, [urlStore]);

	const [{ loading: addLoading }, triggerAdd] = useRequest({
		method : 'GET',
		url    : '/get_media_upload_url',
	}, { manual: true });
	const [{ loading: uploadLoading }, triggerUpload] = usePublicRequest({
		method: 'PUT',
	}, { manual: true });

	let i = 0;
	const done = 10;
	const handleChange = async (values: any) => {
		setPercent(done);
		const promises = [];
		while (i < values.length) {
			try {
				const { data } = await triggerAdd({
					params: { file_name: new Date().getTime() },
				});
				const { url, headers } = data;
				try {
					promises.push(await triggerUpload({
						url,
						data    : values[i],
						headers : {
							'Content-Type': values[i].type,
						},
					}));
					setPercent(done + (50 * i));
				} catch (err) {
					console.log({ err });
				}
				setFileName(values);
				setUrlStore((previousState) => [...previousState, url]);
				i++;
			} catch (err:any) {
				return Toast.error('File Upload failed.......');
			}
		}
		console.log('cververvterb', urlStore);
		Promise.all(promises).then((promise) => {
			promise.forEach((item) => {
				console.log('verbgerthtrege', item);
				setPercent(100);
				setLoading(false);
			});
		});
	};

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
