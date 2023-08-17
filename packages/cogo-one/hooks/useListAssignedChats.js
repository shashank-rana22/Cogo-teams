import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const getParams = ({ value, userId }) => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
	filters                  : {
		sales_agent_id          : userId,
		created_at_less_than    : new Date(),
		created_at_greater_than : DATE_FILTER_MAPPING[value](new Date()),
	},
});

const useListAssignedChats = ({ value }) => {
	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,
	}));

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_assigned_chats',
		method : 'get',
	}, { manual: true });

	const assignChats = useCallback(() => {
		try {
			trigger({
				params: getParams({ value, userId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, value, userId]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		statsData    : data,
		statsLoading : loading,
	};
};

export default useListAssignedChats;
