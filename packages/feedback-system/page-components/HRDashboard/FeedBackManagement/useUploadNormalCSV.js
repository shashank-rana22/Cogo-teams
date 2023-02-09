import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useUploadNormalCSV = () => {
	const [fileValue, setFileValue] = useState();

	const [{ loading = false }] = useRequest({
		url    : 'upload_digital_media_ocean',
		method : 'post',
		params : { file_path: fileValue },
	}, { manual: false });

	return { loading, fileValue, setFileValue };
};
export default useUploadNormalCSV;
