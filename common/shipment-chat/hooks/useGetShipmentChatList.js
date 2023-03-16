import { useCallback } from 'react';
import { useSelector } from '@cogoport/store';
import { useRequest } from '@cogoport/request';
import useGetInfiniteList from './useGetInfiniteList';

const useGetShipmentChatList = ({ status }) => {
	const { user_id } = useSelector((s) => ({
		user_id: s?.profile.id,
	}));

	const [{ loading: apiLoading }, trigger] = useRequest({
		url: 'list_chat_channels',
		method: 'GET',
	}, { manual: true })

	// const { loading: apiLoading, trigger } = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('/list_chat_channels');

	const getShipmentChatList = useCallback(() => {
		(async (restFilters, currentPage) => {
			try {
				await trigger({
					params: {
						filters: {
							subscribe_user_id: user_id,
							status,
							...(restFilters || {}),
						},
						page: currentPage,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger]);

	// const getShipmentChatList = async (restFilters, currentPage) => {
	// 	return trigger({
	// 		params: {
	// 			filters: {
	// 				subscribe_user_id: user_id,
	// 				status,
	// 				...(restFilters || {}),
	// 			},
	// 			page: currentPage,
	// 		},
	// 	});
	// };

	const {
		filters,
		page,
		list: { data, total_page },
		hookSetters,
		refetch,
		loading,
	} = useGetInfiniteList(getShipmentChatList, status);

	return {
		filters,
		ListData: data,
		loading: apiLoading || loading,
		page,
		total_page,
		hookSetters,
		refetch,
	};
};

export default useGetShipmentChatList;
