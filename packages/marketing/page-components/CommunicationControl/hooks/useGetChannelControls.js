import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGE_ONE = 1;

const useGetChannelControls = () => {
	const [data, setData] = useState({});
	const [pagination, setPagination] = useState(PAGE_ONE);
	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_channel_controls',
		method : 'GET',
		params : {
			page: pagination,
		},
	}, { manual: true });

	const getChannelControls = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		getChannelControls();
	}, [pagination, getChannelControls]);

	return {
		list: data?.list,
		loading,
		getChannelControls,
		pagination,
		setPagination,
	};
};

export default useGetChannelControls;
