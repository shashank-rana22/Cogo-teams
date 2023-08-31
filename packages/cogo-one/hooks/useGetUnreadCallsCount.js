import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getPayload = () => ({
	params: {
		page_limit                       : 1,
		total_missed_call_count_required : true,
	},
});

const useGetUnreadCallsCount = ({ activeTab = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const fetchUnreadCall = useCallback(async () => {
		try {
			await trigger(getPayload());
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchUnreadCall();
	}, [fetchUnreadCall, activeTab?.tab]);

	return {
		loading,
		data,
		fetchUnreadCall,
	};
};
export default useGetUnreadCallsCount;
