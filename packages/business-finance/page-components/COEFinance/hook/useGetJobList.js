import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const getFormatDate = (date = '') => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
});

const SUB_ACTIVE_TAB_STATUS_MAPPING = {
	to_be_audited     : 'INIT',
	partially_audited : 'PARTIALLY_AUDITED',
	audited           : 'AUDITED',
};

const useGetJobList = ({
	filters = {},
	paginationFilters = {},
	search = '',
	activeTab = '',
	subActiveTab = '',
	entityCode = '',
}) => {
	const CLOSING_STATUS = activeTab === 'operational_close' ? 'OPR_CLOSED' : 'CLOSED';
	const [{ data = {}, loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/job-profitability/list-jobs-stats',
			authKey : 'get_common_job_profitability_list_jobs_stats',
			method  : 'get',
		},
		{ manual: true },
	);

	const {
		Service = '',
		operationalClosedDate = '', creationDate = '',
		walletUsed = '', tradeType = '',
	} = filters || {};

	const { query = '', debounceQuery = () => {} } = useDebounceQuery();
	const { page = 1, pageLimit = 10 } = paginationFilters || {};

	const refetch = useCallback(({ setShow = () => {} }) => {
		const func = async () => {
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
						status            : SUB_ACTIVE_TAB_STATUS_MAPPING[subActiveTab],
						pageIndex         : page,
						pageSize          : pageLimit,
						serviceType       : Service || undefined,
						entityCode        : entityCode || undefined,
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
				setShow(false);
			} catch (error) {
				toastApiError(error);
			}
		};
		func();
	}, [creationDate, operationalClosedDate, trigger,
		CLOSING_STATUS, subActiveTab, page, pageLimit, Service,
		entityCode, tradeType, query, walletUsed]);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	useEffect(() => {
		refetch({});
	}, [refetch, query]);
	return {
		data,
		loading,
		query,
		refetch,
	};
};
export default useGetJobList;
