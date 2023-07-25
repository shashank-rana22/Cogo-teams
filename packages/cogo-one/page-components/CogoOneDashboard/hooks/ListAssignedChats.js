import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = () => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
});

const useListAssignedChats = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_assigned_chats',
		method : 'get',
	}, { manual: true });

	const assignChats = useCallback(() => {
		try {
			trigger({
				params: getParams(),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		data,
		loading,
	};
};

export default useListAssignedChats;
