import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetShipmentChatList = ({ payload, states = {} }) => {
	const { list = {}, setList = () => {} } = states;
	const { status = '' } = payload?.filters || {};

	const [{ loading }, trigger] = useRequest({
		url    : 'list_chat_channels',
		method : 'GET',
		params : {
			...payload,
		},
	}, { manual: true });

	const getShipmentChatList = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();

				setList((prevState) => ({
					data:
							res?.data?.page <= GLOBAL_CONSTANTS.one
								? res?.data?.list || []
								: [...(prevState.data || []), ...(res?.data?.list || [])],
					total      : res?.data?.total_count,
					total_page : res?.data?.total,
				}));
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, setList]);

	useEffect(() => {
		if (status !== 'unread') {
			getShipmentChatList();
		}
	}, [getShipmentChatList, status]);

	return {
		listData   : list?.data,
		loading,
		total_page : list?.total_page,
	};
};

export default useGetShipmentChatList;
