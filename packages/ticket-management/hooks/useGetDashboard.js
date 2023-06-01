import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useTicketsRequest } from '@cogoport/request';
import {
	useEffect,
	useCallback,
} from 'react';

const useGetDashboard = ({ date }) => {
	const { startDate, endDate } = date || {};

	const [{ data, loading }, trigger] = useTicketsRequest({
		url     : '/dashboard',
		method  : 'get',
		authkey : 'get_tickets_dashboard',
	}, { manual: true });

	const fetchTickets = useCallback(() => {
		try {
			trigger({
				params: {
					StartDate: formatDate({
						date       : startDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
						formatType : 'date',
					}),
					EndDate: formatDate({
						date       : endDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
						formatType : 'date',
					}),
				},
			});
		} catch (error) {
			console.log('error:', error);
		}
	}, [trigger, startDate, endDate]);

	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]);

	return {
		loading,
		data,
	};
};

export default useGetDashboard;
