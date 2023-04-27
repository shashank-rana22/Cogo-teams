import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useListFiles = ({ logType }) => {
	const [params, setParams] = useState({ Page: 1, PageLimit: 10, CsvType: logType });

	const validParams = {};
	Object.keys(params).forEach((key) => { if (params[key]) { validParams[key] = params[key]; } });

	const [{ loading = false, data = {} }, trigger] = useIrisRequest({
		url    : 'get_iris_list_files',
		method : 'get',
		params : { ...validParams },
	}, { manual: false });

	const setPage = (p) => setParams({ ...params, Page: p });

	const refetchFiles = () => {
		trigger({ params });
	};

	return { loading, data, params, setParams, setPage, refetchFiles };
};

export default useListFiles;
