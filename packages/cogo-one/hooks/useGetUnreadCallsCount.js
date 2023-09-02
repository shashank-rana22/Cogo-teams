import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getPayload = () => ({
	params: {
		only_total_missed_call_count_required: true,
	},
});

const useGetUnreadCallsCount = ({ activeTab = {} }) => {
	const { tab = '' } = activeTab;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const fetchUnreadCall = useCallback(() => {
		try {
			trigger(getPayload());
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchUnreadCall();
	}, [fetchUnreadCall, tab]);

	return {
		loading,
		data,
		fetchUnreadCall,
	};
};
export default useGetUnreadCallsCount;
