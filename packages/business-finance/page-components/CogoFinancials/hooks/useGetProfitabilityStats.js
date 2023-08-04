import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { isEmpty, upperCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';
import getDuration from '../utils/getDuration';
import getFormattedDate from '../utils/getFormattedDate';

const useGetProfitabilityStats = ({
	entity = '', timeRange = '', customDate = {},
	filter = {}, showShipmentList = false,
}) => {
	const DEFAULT_CURRENCY = GLOBAL_CONSTANTS.cogoport_entities[entity].currency;

	const [
		{ data:ongoingData, loading:ongoingLoading },
		ongoingTrigger,
	] = useRequestBf(
		{
			url     : '/common/job-profitability/stats',
			method  : 'get',
			authKey : 'get_common_job_profitability_stats',
		},
		{ manual: true },
	);

	const [
		{ data:operationalData, loading:operationalLoading },
		closedTrigger,
	] = useRequestBf(
		{
			url     : '/common/job-profitability/stats',
			method  : 'get',
			authKey : 'get_common_job_profitability_stats',
		},
		{ manual: true },
	);

	const [
		{ data:financialData, loading:financialLoading },
		financialTrigger,
	] = useRequestBf(
		{
			url     : '/common/job-profitability/stats',
			method  : 'get',
			authKey : 'get_common_job_profitability_stats',
		},
		{ manual: true },
	);

	const getProfitabilityStatsData = useCallback(() => {
		const { channel, service, serviceCategory, segment } = filter;
		const { startDate, endDate } = getDuration({ timeRange });
		const { startDate:customStartDate, endDate:customEndDate } = customDate || {};

		const PARAMS = {
			entityCode    : entity,
			startDate     : timeRange === 'custom' ? getFormattedDate(customStartDate) : startDate,
			endDate       : timeRange === 'custom' ? getFormattedDate(customEndDate) : endDate,
			currency      : DEFAULT_CURRENCY,
			parentService : segment,
			service       : !isEmpty(service) ? service.toUpperCase() : undefined,
			tradeType     : serviceCategory ? upperCase(serviceCategory) : undefined,
			channel,
		};

		// no api call if no custom date & range selected
		if (timeRange === 'custom' && !customEndDate) return;

		try {
			ongoingTrigger({
				params: {
					...PARAMS,
					statsType: 'ONGOING',
				},
			});
			closedTrigger({
				params: {
					...PARAMS,
					statsType: 'OPR_CLOSED',
				},
			});
			financialTrigger({
				params: {
					...PARAMS,
					statsType: 'FINANCE_CLOSED',
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [entity, timeRange, ongoingTrigger, closedTrigger,
		financialTrigger, customDate, DEFAULT_CURRENCY,
		filter]);

	useEffect(() => {
		if (!showShipmentList) { // calling stats api only at the parent level
			getProfitabilityStatsData();
		}
	}, [getProfitabilityStatsData, entity, timeRange, showShipmentList]);

	return {
		financialData,
		financialLoading,
		ongoingData,
		ongoingLoading,
		operationalData,
		operationalLoading,
	};
};
export default useGetProfitabilityStats;
