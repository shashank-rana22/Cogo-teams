import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const AGENT_VIEWS = ['supply_admin', 'support_admin', 'sales_admin'];

const getParams = ({ value, userId, viewType }) => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
	filters                  : {
		sales_agent_id          : !(AGENT_VIEWS.includes(viewType)) ? userId : undefined,
		created_at_less_than    : new Date(),
		created_at_greater_than : DATE_FILTER_MAPPING[value](new Date()),
		sales_agent_rm_id       : (AGENT_VIEWS.includes(viewType)) ? userId : undefined,
	},
});

const useListAssignedChats = ({ value = '', viewType = '' }) => {
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
				params: getParams({ value, userId, viewType }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, value, userId, viewType]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		statsData    : data,
		statsLoading : loading,
	};
};

export default useListAssignedChats;
