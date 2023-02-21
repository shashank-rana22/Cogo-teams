import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetManagerFeedbackProgress = () => {
	const [params, setParams] = useState({ filters: {}, page: 1, page_limit: 20 });

	const [{ data = {}, loading = false }, trigger] = useRequest({
		url    : 'list-managers',
		method : 'get',
	}, { manual: false });

	const getManagers = () => {
		try {
			trigger({ params });
		} catch (e) {
			console.log(e.toString());
		}
	};

	useEffect(() => {
		getManagers();
	}, [params]);

	return {
		data,
		loading,
		params,
		setParams,
	};
};

export default useGetManagerFeedbackProgress;
