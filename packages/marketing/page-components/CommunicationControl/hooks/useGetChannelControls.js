import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetChannelControls = ({ pagination = 1 }) => {
	const [data, setData] = useState({});

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
	};
};

export default useGetChannelControls;
