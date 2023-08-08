import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { isEmpty, upperCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';
import getDuration from '../utils/getDuration';
import getFormattedDate from '../utils/getFormattedDate';

const useGetServiceLevelStats = ({
	entity = '', timeRange = '',
	statsType = '',
	filter = {},
	activeBar = '',
	activeShipmentCard = '',
	customDate = new Date(),
	specificServiceLevel = null,
	serviceLevel,
}) => {
	const DEFAULT_CURRENCY = GLOBAL_CONSTANTS.cogoport_entities[entity]?.currency;

	const [
		{ data:serviceLevelData, loading:serviceLevelLoading },
		serviceLevelApiTrigger,
	] = useRequestBf(
		{
			url     : '/common/job-profitability/service-level-stats',
			method  : 'get',
			authKey : 'get_common_job_profitability_service_level_stats',
		},
		{ manual: true },
	);

	const getServiceLevelData = useCallback(() => {
		const { channel, service, serviceCategory, segment } = filter;
		const { startDate, endDate } = getDuration({ timeRange });
		const { startDate:customStartDate, endDate:customEndDate } = customDate || {};

		const params = {
			statsType,
			entityCode    : entity,
			currency      : DEFAULT_CURRENCY,
			startDate     : timeRange === 'custom' ? getFormattedDate(customStartDate) : startDate,
			endDate       : timeRange === 'custom' ? getFormattedDate(customEndDate) : endDate,
			serviceLevel  : !isEmpty(serviceLevel) ? serviceLevel : (specificServiceLevel || 'OVERALL'),
			parentService : segment,
			service,
			tradeType     : serviceCategory ? upperCase(serviceCategory) : undefined,
			channel,
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [entity, serviceLevelApiTrigger,
		statsType, timeRange,
		filter, customDate, specificServiceLevel, DEFAULT_CURRENCY,
		activeBar,
	]);

	useEffect(() => {
		getServiceLevelData();
	}, [getServiceLevelData, entity, timeRange, activeBar, activeShipmentCard, serviceLevel]);

	return {
		serviceLevelData,
		serviceLevelLoading,
		getServiceLevelData,
	};
};
export default useGetServiceLevelStats;
