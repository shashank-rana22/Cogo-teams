import { useRequest } from '@cogoport/request';
import { addDays } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

import { ADD_ONE_DAY, EVENT_MAPPING, TRANSACTION_TYPE } from '../constants';

const PAGE_NUMBER = 1;

const getParams = ({
	pagination,
	currencyCode,
	selectOrganization,
	activeHeaderTab,
	startDate,
	activeStatsCard,
	endDate,
}) => ({
	credit_cogopoint_date_data_required : true,
	page                                : pagination,
	currency                            : currencyCode,
	filters                             : {
		organization_id   : selectOrganization || undefined,
		transaction_type  : TRANSACTION_TYPE[activeStatsCard],
		organization_type : activeHeaderTab === 'overall' ? undefined : activeHeaderTab,
		from_date         : addDays(startDate, ADD_ONE_DAY),
		to_date           : endDate || undefined,
		event             : EVENT_MAPPING[activeStatsCard] || undefined,
	},
});

const useListCogopointTopHistory = ({
	transactionType = '',
	selectedDate = {},
	activeStatsCard = '',
	activeHeaderTab = '',
	currencyCode = '',
}) => {
	const { startDate, endDate } = selectedDate || {};

	const [pagination, setPagination] = useState(PAGE_NUMBER);
	const [selectOrganization, setSelectOrganization] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_cogopoint_top_history',
		method : 'get',
	}, { manual: true });

	const listCogopointTopHistory = useCallback(() => {
		try {
			trigger({
				params: getParams({
					pagination,
					currencyCode,
					selectOrganization,
					transactionType,
					activeHeaderTab,
					startDate,
					activeStatsCard,
					endDate,
				}),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger,
		pagination,
		currencyCode,
		transactionType,
		activeHeaderTab, startDate, endDate, activeStatsCard, selectOrganization]);

	useEffect(() => {
		listCogopointTopHistory();
	}, [listCogopointTopHistory]);

	return {
		topHistoryData    : data,
		topHistoryLoading : loading,
		setPagination,
		setSelectOrganization,
		selectOrganization,
	};
};

export default useListCogopointTopHistory;
