import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const useGetShipmentChatList = ({ status }) => {
	const { user_id } = useSelector((state) => ({
		user_id: state?.profile?.user.id,
	}));

	const [list, setList] = useState({
		data       : [],
		total      : 0,
		total_page : 0,
	});
	const [filters, setFilters] = useState({ page: 1 });
	const { page, q } = filters;

	const [{ loading: apiLoading }, trigger] = useRequest({
		url    : 'list_chat_channels',
		method : 'GET',
	}, { manual: true });

	const getShipmentChatList = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						filters: {
							subscribe_user_id: user_id,
							status,
							q,
						},
						page,
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
	}, [trigger, status, user_id, page, q]);

	useEffect(() => {
		getShipmentChatList();
	}, [getShipmentChatList]);

	return {
		filters,
		setFilters,
		ListData   : list?.data,
		loading    : apiLoading,
		page,
		total_page : list?.total_page,
		setList,
	};
};

export default useGetShipmentChatList;
