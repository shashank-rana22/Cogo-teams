/* eslint-disable no-await-in-loop */
import { Upload, Toast } from '@cogoport/components';
import { IcMDocument } from '@cogoport/icons-react';
import { useRequest, usePublicRequest } from '@cogoport/request';
import React, { useState } from 'react';

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
				onChange(values);
				setFileName(values);
				i++;
			} catch (err:any) {
				return Toast.error('File Upload failed.......');
			}
		}
		Promise.all(promises).then((promise) => {
			promise.forEach((item) => {
				setPercent(100);
				setLoading(false);
			});
		});
	};

	return (
		<>
			<Upload {...rest} value={fileName} multiple={multiple} onChange={handleChange} loading={loading} />
			{(percent > 0 && percent < 100) && (
				<div className={styles.progress_container}>
					<IcMDocument
						style={{ height: '30', width: '30', color: '#2C3E50' }}
					/>
					<div>
						<div className={styles.file_name}>{`File downloading (${percent}%)...`}</div>
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
