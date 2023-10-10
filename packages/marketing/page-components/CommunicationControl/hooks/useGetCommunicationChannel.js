import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGE_ONE = 1;

const useGetCommunicationChannel = ({ defaultParams = {} }) => {
	const [data, setData] = useState({});
	const [pagination, setPagination] = useState(PAGE_ONE);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_channel_view',
		method : 'GET',
		params : {
			...(defaultParams || {}),
			page: pagination,
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

	const { emailType = '' } = defaultParams;

	useEffect(() => {
		getChannelConfig();
	}, [pagination, emailType, getChannelConfig]);

	return {
		data,
		loading,
		getChannelConfig,
		pagination,
		setPagination,
	};
};
export default useGetCommunicationChannel;
