import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGE_ONE = 1;

const useGetCommunicationChannel = ({ pagination = PAGE_ONE, channel = '', emailType }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_channel_view',
		method : 'GET',
		params : {
			filters: {
				email_type: emailType || undefined,
			},
			page: pagination,
			channel,
		},
	}, { manual: true });

	const getChannelConfig = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		getChannelConfig();
	}, [pagination, emailType, getChannelConfig]);

	return {
		data,
		loading,
		getChannelConfig,
	};
};
export default useGetCommunicationChannel;
