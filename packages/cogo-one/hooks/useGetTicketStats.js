import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getParams = ({ userId = '', performedById = '' }) => ({
	UserID        : userId || undefined,
	PerformedByID : performedById || undefined,
});

const useGetTicketStats = ({ userId = '', activeTab = '' }) => {
	const { performedById } = useSelector(({ profile }) => ({ performedById: profile.user.id }));

	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/stats',
		method  : 'get',
		authkey : 'get_tickets_stats',
	}, { manual: true });

	const fetchTicketsStats = useCallback(() => {
		try {
			trigger({
				params: getParams({ userId, performedById }),
			});
		} catch (e) {
			console.error('error', e);
		}
	}, [performedById, trigger, userId]);

	useEffect(() => {
		if (activeTab !== 'email' && userId) {
			fetchTicketsStats();
		}
	}, [fetchTicketsStats, userId, activeTab]);

	return {
		statsData    : data,
		statsLoading : loading,
		fetchTicketsStats,
	};
};

export default useGetTicketStats;
