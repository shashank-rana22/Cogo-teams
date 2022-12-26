import { Upload, Toast } from '@cogoport/components';
import React, { useState, useEffect } from 'react';
import {useRequest} from '@cogoport/request'

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

	// const [showUploadedFileName, setShowUploadedFileName] = useState(true);
	const [percentComplete, setPercentComplete] = useState(0);
	// const [isOnline, setIsOnline] = useState(true);
	const [fileName, setFileName] = useState(null);

	let newValue = value;

	if ( multiple) {
		newValue = (value || []).map((item: any, i: number): any => ({
			url  : item,
			name : `${docName}`,
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

	// useEffect(() => {
	// 	window.addEventListener('online', () => setIsOnline(true));
	// 	window.addEventListener('offline', () => setIsOnline(false));
	// 	return () => {
	// 		window.removeEventListener('online', () => {});
	// 		window.removeEventListener('offline', () => {});
	// 	};
	// }, []);

	useEffect(() => {
		let newValue1 = value;
		if (onlyURLOnChange && multiple) {
			newValue1 = (value || []).map((item: any, i: number) => ({
				url  : item,
				name : `${docName}${i + 1}`,
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

	// const handleRemove = (file) => {
	// 	const restFiles = uploadedFileList.filter((item) => file.uid !== item.uid);
	// 	setUploadedFileList(restFiles);
	// 	if (multiple) handleFilesChange(restFiles);
	// 	else onChange(null);
	// 	setPercentComplete(0);
	// };


	const [{ loading: addLoading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_media_upload_url',
	}, { manual: true });


	// const handleChange = (info: any) => {
	// 	if (maxSize && info?.size > Number(maxSize)) {
	// 		const sizeInMb = (maxSize / 1048576).toFixed(2);
	// 		return Toast.error(`File Upload failed, Maximum size allowed - ${sizeInMb} MB`);
	// 	}
	// 	if (!isOnline) {
	// 		return Toast.error('File Upload failed, Please Check Your Internet connection');
	// 	}
	// 	setPercentComplete(1);
	// 	setFileName(info);
	// 	return null;
	// };
	const handleChange = async(values: any) => {
	console.log("valueeees",values)
		try {
			const {data = {}} = await trigger({ data:  values  });
			console.log("responseee",data)
			if(data){
				const { url } = data;
			}
			setFileName(values)

		} catch (err:any) {
			return Toast.error('File Upload failed.......');
		}
	};
	return <Upload {...rest}  value={fileName} multiple={multiple} onChange={handleChange}/>;
}

export default FileUploader;
