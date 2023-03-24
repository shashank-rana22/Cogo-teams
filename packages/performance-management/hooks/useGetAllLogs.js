import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetAllLogs = (LogID = '') => {
	const [params, setParams] = useState({
		LogID,
	});
	const [{ data : LogData = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_get_comments',
		method : 'get',
		params,
	}, { manual: false });

	return { LogData, loading, setParams };
};

export default useGetAllLogs;
