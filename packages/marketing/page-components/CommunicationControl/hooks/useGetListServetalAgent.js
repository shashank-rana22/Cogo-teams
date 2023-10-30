import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGE_ONE = 1;

const useGetListServetalAgent = ({ partnerUser = '', pagination = PAGE_ONE }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_servetel_agents',
		method : 'GET',
		params : {
			page    : pagination,
			filters : {
				agent_id: partnerUser,
			},
		},
	}, { manual: true });

	const listServetalAgent = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		listServetalAgent();
	}, [pagination, listServetalAgent]);

	return {
		data,
		loading,
		listServetalAgent,
	};
};
export default useGetListServetalAgent;
