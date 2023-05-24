import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetAllLogs = () => {
	const [params, setParams] = useState({ });
	const [{ data : LogData = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_get_comments',
		method : 'get',
		params,
	}, { manual: false });

	return { LogData, loading, setParams, params };
};

export default useGetAllLogs;
