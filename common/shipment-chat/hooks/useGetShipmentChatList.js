import { useCallback, useEffect } from 'react';
import { useSelector } from '@cogoport/store';
import { useRequest } from '@cogoport/request';
// import useGetFiniteList from './useGetFiniteList';

const useGetShipmentChatList = ({ status }) => {
	const { user_id } = useSelector((s) => (
		console.log(s, 'sss'), {

			user_id: s?.profile?.user.id,
		}));

	const [{ loading: apiLoading, data }, trigger] = useRequest({
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
			return trigger({
				params: {
					filters: {
						subscribe_user_id: user_id,
						status,
						...(restFilters || {}),
					},
					page: currentPage,
				},
			});
		})();
	}, [trigger]);

	useEffect(() => {
		getShipmentChatList();
	}, [getShipmentChatList, status]);

	console.log(getShipmentChatList, 'get');

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

	// const {
	// 	filters,
	// 	page,
	// 	list: { data, total_page },
	// 	hookSetters,
	// 	refetch,
	// 	loading,
	// } = useGetFiniteList(getShipmentChatList, status);

	console.log(data, 'dataaa');

	return {
		// filters,
		ListData: data?.list,
		// loading: apiLoading || loading,
		// page,
		// total_page,
		// hookSetters,
		// refetch,
	};
};

export default useGetShipmentChatList;
