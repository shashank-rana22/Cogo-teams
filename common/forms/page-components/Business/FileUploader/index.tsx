import { Upload, Toast } from '@cogoport/components';
import React, { useState} from 'react';
import {useRequest,usePublicRequest} from '@cogoport/request'

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

	useInterval(() => {
		if (percentComplete > 0 && percentComplete < 95) {
			setPercentComplete(percentComplete + 3);
		}
	}, 120);




	// const handleRemove = (file) => {
	// 	const restFiles = uploadedFileList.filter((item) => file.uid !== item.uid);
	// 	setUploadedFileList(restFiles);
	// 	if (multiple) handleFilesChange(restFiles);
	// 	else onChange(null);
	// 	setPercentComplete(0);
	// };


	const [{ loading: addLoading }, triggerAdd] = useRequest({
		method : 'GET',
		url    : '/get_media_upload_url',
	}, { manual: true });
	const [{ loading: uploadLoading }, triggerUpload] = usePublicRequest({
		method: 'PUT',
	}, { manual: true });
    let i=0;
	const handleChange = async(values: any) => {
	console.log("valueeees",values)
	while(i<values.length){
		try {
			const {data} = await triggerAdd({ 
				params:  { file_name: new Date().getTime()}  
			});
			console.log("responseee",data)
			
			const { url, headers } = data;
			console.log("url",url)
			try {
				await triggerUpload({
					url     : url,
					data    : values[i],
					headers : {
						'Content-Type': values[i].type,
					},
				});
				i++
			} catch(err) {
				console.log({err})
			}
			setFileName(values)

		} catch (err:any) {
			return Toast.error('File Upload failed.......');
		}
	}
	};
	
	return (
		<>
			<Upload {...rest}  value={fileName} multiple={multiple} onChange={handleChange}/>
			{percentComplete > 0 && percentComplete<100 &&
			<progress value={percentComplete} max="100">3%</progress>}
		</>
	)
	
	
}

export default FileUploader;
