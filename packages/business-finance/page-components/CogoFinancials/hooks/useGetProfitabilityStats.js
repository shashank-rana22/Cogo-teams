import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import { useRequestBf } from '@cogoport/request';
import { isEmpty, upperCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';
import getDuration from '../utils/getDuration';

const geo = getGeoConstants();
const DEFAULT_CURRENCY = geo?.country.currency.code;

const useGetProfitabilityStats = ({ entity = '', timeRange = '', activeShipmentCard = '', filter = {} }) => {
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

	const api = useCallback(() => {
		const { currency, channel, service, serviceCategory, segment } = filter;
		const { startDate, endDate } = getDuration({ timeRange });
		const IS_HARD_CODED = true;

		const PARAMS = {
			entityCode    : entity,
			startDate     : IS_HARD_CODED ? '2023-07-28' : startDate,
			endDate       : IS_HARD_CODED ? '2023-07-28' : endDate,
			currency      : currency || DEFAULT_CURRENCY,
			parentService : segment,
			service,
			tradeType     : serviceCategory ? upperCase(serviceCategory) : undefined,
			channel,
		};

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
		financialTrigger,
		filter]);

	useEffect(() => {
		if (isEmpty(activeShipmentCard)) { // calling stats api only at the parent level
			api();
		}
	}, [api, entity, timeRange, activeShipmentCard]);

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
