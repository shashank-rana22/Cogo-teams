import { useRequest } from '@cogoport/request';
import { addDays } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

import { EVENT_MAPPING } from '../constants';

const PAGE_NUMBER = 1;
const ADD_DAY = 1;

const getParams = ({
	pagination,
	currencyCode,
	selectOrganization,
	transactionType,
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
		transaction_type  : transactionType,
		organization_type : activeHeaderTab === 'overall' ? undefined : activeHeaderTab,
		from_date         : addDays(startDate, ADD_DAY),
		to_date           : endDate,
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
	const [pagination, setPagination] = useState(PAGE_NUMBER);
	const [selectOrganization, setSelectOrganization] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_cogopoint_top_history',
		method : 'get',
	}, { manual: true });

	const { startDate, endDate } = selectedDate || {};

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
			console.log(error);
		}
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
