import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import { useRequestBf } from '@cogoport/request';
import { upperCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';
import getDuration from '../utils/getDuration';

const geo = getGeoConstants();
const DEFAULT_CURRENCY = geo?.country.currency.code;

const useGetServiceLevelStats = ({
	entity = '', timeRange = '',
	statsType = '',
	serviceLevel = '',
	filter = {},
}) => {
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

	const api = useCallback(() => {
		const { currency, channel, service, serviceCategory, segment } = filter;
		const { startDate, endDate } = getDuration({ timeRange });
		const IS_HARD_CODED = true;

		const params = {
			statsType,
			entityCode    : entity,
			currency      : currency || DEFAULT_CURRENCY,
			startDate     : IS_HARD_CODED ? '2023-07-28' : startDate,
			endDate       : IS_HARD_CODED ? '2023-07-28' : endDate,
			serviceLevel,
			parentService : segment,
			service,
			tradeType     : serviceCategory ? upperCase(serviceCategory) : undefined,
			channel,
		};

		try {
			serviceLevelApiTrigger({
				params,
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [entity, serviceLevel, serviceLevelApiTrigger,
		statsType, timeRange,
		filter]);

	useEffect(() => {
		api();
	}, [api, entity, timeRange]);

	return {
		serviceLevelData,
		serviceLevelLoading,
	};
};
export default useGetServiceLevelStats;
