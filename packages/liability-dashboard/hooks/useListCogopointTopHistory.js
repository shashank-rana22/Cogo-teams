import { useRequest } from '@cogoport/request';
import { addDays } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

import { EVENT_MAPPING } from '../constants';

const PAGE_NUMBER = 1;
const ADD_DAY = 1;

const useListCogopointTopHistory = ({
	transactionType = '',
	selectedDate = {},
	activeStatsCard = '',
	activeHeaderTab = '',
	currencyCode = '',
}) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_cogopoint_top_history',
		method : 'get',
	}, { manual: true });

	const [pagination, setPagination] = useState(PAGE_NUMBER);
	const [selectOrganization, setSelectOrganization] = useState('');
	const { startDate, endDate } = selectedDate || {};

	const listCogopointTopHistory = useCallback(() => {
		trigger({
			params: {
				credit_cogopoint_date_data_required : true,
				page                                : pagination,
				currency                            : currencyCode,
				filters                             : {
					organization_id   : selectOrganization,
					transaction_type  : transactionType,
					organization_type : activeHeaderTab === 'overall' ? undefined : activeHeaderTab,
					from_date         : addDays(startDate, ADD_DAY),
					to_date           : endDate,
					event             : EVENT_MAPPING[activeStatsCard] || undefined,
				},
			},
		});
	}, [trigger,
		pagination,
		currencyCode,
		transactionType,
		activeHeaderTab, startDate, endDate, activeStatsCard, selectOrganization]);

	useEffect(() => {
		listCogopointTopHistory();
	}, [listCogopointTopHistory, activeStatsCard]);

	return {
		topHistoryData    : data,
		topHistoryLoading : loading,
		setPagination,
		setSelectOrganization,
		selectOrganization,
	};
};

export default useListCogopointTopHistory;
