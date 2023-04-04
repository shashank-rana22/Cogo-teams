import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useGetShipmentChatList = ({ payload, states = {} }) => {
	const { list = {}, setList = () => {} } = states;

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
						res?.data?.page <= 1
							? res?.data?.list || []
							: [...(prevState.data || []), ...(res?.data?.list || [])],
					total      : res?.data?.total_count,
					total_page : res?.data?.total,
				}));
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, setList]);

	useEffect(() => {
		getShipmentChatList();
	}, [getShipmentChatList]);

	return {
		listData   : list?.data,
		loading,
		total_page : list?.total_page,
	};
};

export default useGetShipmentChatList;
