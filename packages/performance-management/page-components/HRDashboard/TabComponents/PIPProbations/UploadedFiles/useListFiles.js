import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useListFiles = () => {
	const [params, setParams] = useState({ Page: 1, PageLimit: 10 });

	const [{ loading = false, data = {} }] = useIrisRequest({
		url    : 'get_iris_list_files',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => setParams({ ...params, Page: p });

	return { loading, data, params, setParams, setPage };
};

export default useListFiles;
