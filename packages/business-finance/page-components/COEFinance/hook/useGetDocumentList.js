import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const getFormatDate = (date = '') => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
});
const useGetDocumentList = ({
	paginationFilters = {},
	search = '',
	activeTab = '',
}) => {
	const CLOSING_STATUS = activeTab === 'operational_close' ? 'OPR_CLOSED' : 'CLOSED';
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/common/job-profitability/list-jobs-stats',
			authKey : 'get_common_job_profitability_list_jobs_stats',
			method  : 'get',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery = () => {} } = useDebounceQuery();
	const { page = 1, pageLimit = 10 } = paginationFilters || {};
	const refetch = useCallback((filters = {}) => {
		(async () => {
			const {
				Service = '', Entity = '',
				operationalClosedDate = '', creationDate = '',
				walletUsed = '', tradeType = '',
			} = filters || {};
			const {
				startDate : creationStartDate = '', endDate : creationEndDate = '',
			} = creationDate || '';
			const {
				startDate : opeerationalClosedStartDate = '', endDate : operationalClosedEndDate = '',
			} = operationalClosedDate || '';
			try {
				await trigger({
					params: {
						currentState      : CLOSING_STATUS,
						pageIndex         : page,
						pageSize          : pageLimit,
						serviceType       : Service || undefined,
						entityCode        : Entity || undefined,
						tradeType         : tradeType || undefined,
						creationStartDate : (creationStartDate && creationEndDate && getFormatDate(creationStartDate))
						|| undefined,
						creationEndDate: (creationStartDate && creationEndDate && getFormatDate(creationEndDate))
						|| undefined,
						operationalClosedStartDate: (opeerationalClosedStartDate && operationalClosedEndDate
							&& getFormatDate(opeerationalClosedStartDate)) || undefined,
						operationalClosedEndDate: (opeerationalClosedStartDate && operationalClosedEndDate
							&& getFormatDate(operationalClosedEndDate)) || undefined,
						query      : query || undefined,
						walletUsed : walletUsed || undefined,
					},
				});
			} catch (error) {
				toastApiError(error);
			}
		})();
	}, [CLOSING_STATUS, page, pageLimit, query, trigger]);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	useEffect(() => {
		refetch();
	}, [refetch, query]);
	return {
		data,
		loading,
		query,
		refetch,
	};
};
export default useGetDocumentList;
