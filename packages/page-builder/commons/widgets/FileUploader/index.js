import { Upload, Toast } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { publicRequest, request } from '@cogoport/request';
import React, { useState, useEffect } from 'react';

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
	}, [multiple, urlStore, onChange]);

	const uploadFile = () => async (file) => {
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

		return finalUrl;
	};

	const handleChange = async (values) => {
		try {
			setLoading(true);

			if (values.length > 0) {
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

	return (
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
	);
}

export default FileUploader;
