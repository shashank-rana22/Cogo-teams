import { useRequest } from '@cogoport/request';
import { startOfDay, startOfWeek, startOfMonth } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const DATE_FILTER_MAPPING = {
	day   : startOfDay,
	week  : startOfWeek,
	month : startOfMonth,

};

const getParams = ({ timeline }) => ({
	chat_stats_required      : true,
	data_required            : false,
	pagination_data_required : false,
	filters                  : {
		created_at_less_than    : new Date(),
		created_at_greater_than : DATE_FILTER_MAPPING[timeline](new Date()),
	},
});

const useListAssignedChats = ({ timeline = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_assigned_chats',
		method : 'get',
	}, { manual: true });

	const assignChats = useCallback(() => {
		try {
			trigger({
				params: getParams({ timeline }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, timeline]);

	useEffect(() => {
		assignChats();
	}, [assignChats]);

	return {
		data,
		loading,
	};
};

export default useListAssignedChats;
