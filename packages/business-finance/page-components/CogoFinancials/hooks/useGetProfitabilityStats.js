import getGeoConstants from '@cogoport/globalization/constants/geo/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const TOTAL_HOURS = 24;
const TOTAL_MINUTES_OR_SECONDS = 60;
const TOTAL_MILLISECONDS = 1000;

const geo = getGeoConstants();
const DEFAULT_CURRENCY = geo?.country.currency.code;

const useGetProfitabilityStats = ({ filter = '', entity = '', timeRange = '' }) => {
	const { currency } = filter;
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

	const getDuration = useCallback(() => {
		const DAYS_MAPPING = {
			'1D' : 1,
			'1W' : 7,
			'1M' : 30,
			'6M' : 180,
			'1Y' : 365,
		};

		const today = new Date();

		const endDate = formatDate({
			date       : Date.now(),
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		});

		const startDateValue = new Date(today.getTime() - DAYS_MAPPING[timeRange]
		* TOTAL_HOURS * TOTAL_MINUTES_OR_SECONDS * TOTAL_MINUTES_OR_SECONDS
		* TOTAL_MILLISECONDS);

		const startDate = formatDate({
			date       : startDateValue,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		});

		return ({ startDate, endDate });
	}, [timeRange]);

	useEffect(() => {
		// const { startDate, endDate } = getDuration();
		const api = () => {
			const PARAMS = {

				entityCode : entity,
				startDate  : '2023-07-28',
				endDate    : '2023-07-28',
				currency   : currency || DEFAULT_CURRENCY,
				// parentService : 'OCEAN',
				// service       : 'FCL_FREIGHT',
				// tradeType     : 'EXPORT',
				// channel       : 'SME',
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
		};
		api();
	}, [ongoingTrigger, closedTrigger, financialTrigger,
		currency, entity, timeRange,
		getDuration]);

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
