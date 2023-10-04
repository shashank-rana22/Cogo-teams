import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { upperCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.js';
import getDuration from '../utils/getDuration';
import getFormattedDate from '../utils/getFormattedDate';

const useGetShipmentList = ({
	entity = '',
	timeRange = '',
	statsType = '',
	filter = {},
	activeBar = '',
	customDate = new Date(),
	tableFilters,
	sort = {},
	taxType = '',
}) => {
	const DEFAULT_CURRENCY = GLOBAL_CONSTANTS.cogoport_entities[entity]?.currency;
	const { query = '', debounceQuery } = useDebounceQuery();

	const [
		{ data: serviceLevelData, loading: serviceLevelLoading },
		serviceLevelApiTrigger,
	] = useRequestBf(
		{
			url     : '/common/job-profitability/list-shipment',
			method  : 'get',
			authKey : 'get_common_job_profitability_list_shipment',
		},
		{ manual: true },
	);

	const { pageIndex, serviceLevel:serviceLevelFilter, query:searchQuery } = tableFilters;

	const getShipmentList = useCallback(() => {
		const { channel, service, serviceCategory, segment } = filter;
		const { startDate, endDate } = getDuration({ timeRange });
		const { startDate: customStartDate, endDate: customEndDate } = customDate || {};
		const { sortBy, sortType } = sort;

		const params = {
			statsType,
			entityCode    : entity,
			currency      : DEFAULT_CURRENCY,
			startDate     : timeRange === 'custom' ? getFormattedDate(customStartDate) : startDate,
			endDate       : timeRange === 'custom' ? getFormattedDate(customEndDate) : endDate,
			serviceLevel  : serviceLevelFilter || activeBar || undefined,
			parentService : segment,
			service,
			tradeType     : serviceCategory ? upperCase(serviceCategory) : undefined,
			channel,
			pageIndex,
			query         : query || undefined,
			sortBy        : sortBy ? `${sortBy}${taxType}` : undefined,
			sortType      : sortType || undefined,
		};

		// no api call if no custom date & range selected
		if (timeRange === 'custom' && !customEndDate) return;

		try {
			serviceLevelApiTrigger({
				params,
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [entity, serviceLevelApiTrigger,
		statsType, timeRange,
		filter, customDate, pageIndex, activeBar, serviceLevelFilter,
		DEFAULT_CURRENCY, query, sort, taxType]);

	useEffect(() => {
		getShipmentList();
	}, [getShipmentList]);

	useEffect(() => {
		debounceQuery(searchQuery);
	}, [debounceQuery, searchQuery]);

	return {
		serviceLevelData,
		serviceLevelLoading,
	};
};
export default useGetShipmentList;
