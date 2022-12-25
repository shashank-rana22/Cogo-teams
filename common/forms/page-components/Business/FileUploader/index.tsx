import { Upload, Toast } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import useInterval from '../../../hooks/useInterval';

const UPLOD_URL = `${process.env.NEXT_PUBLIC_REST_BASE_API_URL}/get_media_upload_url`;

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

	const [showUploadedFileName, setShowUploadedFileName] = useState(true);
	const [percentComplete, setPercentComplete] = useState(0);
	const [isOnline, setIsOnline] = useState(true);
	const [fileName, setFileName] = useState(null);

	let newValue = value;

	if (onlyURLOnChange && multiple) {
		newValue = (value || []).map((item: any, i: number): any => ({
			url  : item,
			name : `${docName} ${i + 1}`,
			uid  : item,
		}));
	}

	const [uploadedFileList, setUploadedFileList] = useState(
		filesList || Array.isArray(newValue)
			? newValue
			: ((value || {}).url && [value]) || [],
	);

	useInterval(() => {
		if (percentComplete > 0 && percentComplete < 95) {
			setPercentComplete(percentComplete + 3);
		}
	}, 120);

	useEffect(() => {
		window.addEventListener('online', () => setIsOnline(true));
		window.addEventListener('offline', () => setIsOnline(false));
		return () => {
			window.removeEventListener('online', () => {});
			window.removeEventListener('offline', () => {});
		};
	}, []);

	useEffect(() => {
		let newValue1 = value;
		if (onlyURLOnChange && multiple) {
			newValue1 = (value || []).map((item: any, i: number) => ({
				url  : item,
				name : `${docName} ${i + 1}`,
				uid  : item,
			}));
		}
		let filesToSet = [];

		if (filesList || Array.isArray(newValue)) {
			filesToSet = newValue1;
		} else if (value?.url) {
			filesToSet = [value];
		} else if (value) {
			const newDocNames = (value || '').split('/');
			const newDocName = newDocNames[newDocNames.length - 1];
			filesToSet = [{ url: value, uid: value, name: newDocName || 'img' }];
		}
		setUploadedFileList(filesToSet);
	}, [value]);

	const uploadDocument = (file: any, documentData: any) => new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		const { url, headers } = JSON.parse(documentData);
		if (url) {
			xhr.open('PUT', url);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(documentData);
					} else {
						setShowUploadedFileName(false);
						reject(Toast.error('There as an issue uploading the document'));
					}
				}
			};
			Object.keys(headers).forEach((header) => xhr.setRequestHeader(header, headers[header]));
			xhr.send(file);
		} else {
			setShowUploadedFileName(false);
			Toast.error('Error in Uploading File, Try again!');
		}
	});

	const getRequest = (url: string, params: any) => new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `${url}?file_name=${params.file_name}`, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(xhr.responseText);
				} else {
					setShowUploadedFileName(false);
					reject(Toast.error('There as an issue uploading the document.'));
				}
			}
		};
		xhr.send();
	});

	const getSignature = async (params: any) => {
		try {
			const response: any = await getRequest(UPLOD_URL, params);
			if (response.success) return response.data;
			return response;
		} catch (error) {
			setShowUploadedFileName(false);
			return error;
		}
	};

	const handleFilesChange = (files: any) => {
		const urls = files.map((item: any) => item.url);
		if (onlyURLOnChange) {
			onChange(urls, files);
		} else {
			onChange(files);
		}
	};
	const setImageUrls = (url: any, file: any) => {
		const files = [
			...uploadedFileList,
			{
				success            : true,
				name               : file.name,
				uid                : file.uid,
				type               : file.type,
				size               : file.size,
				lastModified       : file.lastModified,
				lastModifiedDate   : file.lastModifiedDate,
				webkitRelativePath : file.webkitRelativePath,
				url,
			},
		];
		setUploadedFileList([...files]);
		if (multiple) handleFilesChange(files);
		else if (onlyURLOnChange) {
			onChange(url, { success: true, name: file.name, url });
		} else {
			onChange({ success: true, name: file.name, url });
		}
	};

	// const handleRemove = (file) => {
	// 	const restFiles = uploadedFileList.filter((item) => file.uid !== item.uid);
	// 	setUploadedFileList(restFiles);
	// 	if (multiple) handleFilesChange(restFiles);
	// 	else onChange(null);
	// 	setPercentComplete(0);
	// };

	const handleUpload = (name: string, file: any) => {
		if (file) {
			getSignature({ file_name: name })
				.then((response: any) => uploadDocument(file, response))
				.then((res: any) => {
					const resObj = JSON.parse(res);
					if ((resObj || {}).url) {
						setImageUrls(resObj.url.split('?')[0], file);
						setPercentComplete(100);
					} else {
						setShowUploadedFileName(false);
						setPercentComplete(0);
						if (!isOnline) {
							Toast.error('File Upload failed, Please Check Your Internet connection');
						} else Toast.error('File Upload failed, Try again');
					}
				})
				.catch(() => {
					setShowUploadedFileName(false);
					setPercentComplete(0);
					return Toast.error('File upload failed, Try Again');
				});
		}
	};

	const handleChange = (info: any) => {
		if (maxSize && info?.size > Number(maxSize)) {
			const sizeInMb = (maxSize / 1048576).toFixed(2);
			return Toast.error(`File Upload failed, Maximum size allowed - ${sizeInMb} MB`);
		}
		if (!isOnline) {
			return Toast.error('File Upload failed, Please Check Your Internet connection');
		}
		setPercentComplete(1);
		setFileName(info);
		handleUpload(info?.name, info);
		return null;
	};

	return <Upload {...rest} multiple={multiple} value={fileName} onChange={handleChange} />;
}

export default FileUploader;
