import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const useGetShipmentChatList = ({ status }) => {
	const [list, setList] = useState({
		data       : [],
		total      : 0,
		total_page : 0,
	});
	const [filters, setFilters] = useState({ page: 1, highlight: undefined });
	const { page } = filters;

	const { user_id } = useSelector((s) => ({
		user_id: s?.profile?.user.id,
	}));

	const [{ loading: apiLoading }, trigger] = useRequest({
		url    : 'list_chat_channels',
		method : 'GET',
	}, { manual: true });
	const getShipmentChatList = useCallback(() => {
		(async (restFilters, currentPage) => {
			console.log(currentPage, 'currentPage');
			try {
				const res = await trigger({
					params: {
						filters: {
							subscribe_user_id: user_id,
							status,
							...(restFilters || {}),
						},
						page: currentPage || '1',
					},
				});
				setList((prevState) => ({
					data:
						res?.data?.page <= 1
							? res?.data?.list || []
							: [...(prevState.data || []), ...(res?.data?.list || [])],
					total      : res?.data?.total_count,
					total_page : res?.data?.total,
				}));
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, status, user_id]);

	useEffect(() => {
		getShipmentChatList();
	}, [status, getShipmentChatList]);

	const hookSetters = {
		setFilters,
	};

	console.log(list, 'getttttt');

	return {
		filters    : {},
		ListData   : list?.data,
		loading    : apiLoading,
		page,
		total_page : list?.total_page,
		hookSetters,
	};
};

export default useGetShipmentChatList;
