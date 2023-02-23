import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetManagerFeedbackProgress = () => {
	const [params, setParams] = useState({ filters: {}, page: 1, page_limit: 20 });

	const [{ data = {}, loading = false }] = useRequest({
		url    : 'list-managers',
		method : 'get',
		params,
	}, { manual: false });

	return {
		data,
		loading,
		params,
		setParams,
	};
};

export default useGetManagerFeedbackProgress;
