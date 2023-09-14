import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetCcCommunicationStats = ({
	dateFilter = {},
}) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_cc_communication_stats',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		trigger({
			params: {
				start_date: formatDate({
					date       : dateFilter?.startDate,
					formatType : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				}),

				end_date: formatDate({
					date       : dateFilter?.endDate,
					formatType : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				}),
			},
		});
	}, [dateFilter?.endDate, dateFilter?.startDate, trigger]);
	return {
		ccCommLoading : loading,
		ccCommStats   : data || [],
	};
};

export default useGetCcCommunicationStats;
