import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { entityMappingData } from '../P&L/PLStatement/constant';

interface FilterInterface {
	filters?:{
		date?:string
		category?:string
		entity?:string
	}
	monthPayload?:string
}
const useReport = ({
	filters = {},
	monthPayload,
}:FilterInterface) => {
	const [
		{ data:reportData, loading:reportTriggerLoading },
		reportTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/report',
			method  : 'get',
			authKey : 'get_pnl_statement_report',
		},
		{ manual: true },
	);

	const [
		{ data:ratiosData, loading:ratiosTriggerLoading },
		ratioTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/turnover-ratios',
			method  : 'get',
			authKey : 'get_pnl_statement_list',
		},
		{ manual: true },
	);
	const getLastMonthData = useCallback(() => {
		if (filters?.category === 'lastMonth') {
			const currentDate = new Date();
			currentDate.setMonth(currentDate.getMonth() - 1);
			const yearData = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1;
			const monthValue = month.toString().padStart(2, '0');
			const lastMonth = `${yearData}-${monthValue}-01`;
			return [lastMonth];
		}
		if (filters?.category === 'lastQuarter') {
			const now = new Date();
			// eslint-disable-next-line no-mixed-operators
			const prevQuarterLastMonth = new Date(now.getFullYear(), now.getMonth() - (now.getMonth() + 3) % 3, 0);
			const lastThreeMonths = Array.from({ length: 3 }, (_, i) => new Date(
				prevQuarterLastMonth.getFullYear(),
				prevQuarterLastMonth.getMonth() - i,
				1,
			));
			const lastThreeMonthsFormatted = lastThreeMonths.map((date) => `${date.getFullYear()}
			-0${date.getMonth() + 1}-01`);
			return lastThreeMonthsFormatted;
		}
		return null;
	}, [filters?.category]);

	const fetchReportApi = useCallback(async (setShowReport) => {
		try {
			await reportTrigger({
				params: {
					periods      : getLastMonthData() || [filters?.date] || undefined,
					cogoEntityId : entityMappingData[filters?.entity] || undefined,
				},
			});

			setShowReport(true);
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [getLastMonthData, reportTrigger, filters?.date, filters?.entity]);

	const fetchRatioApi = useCallback(async (setShowReport?:any) => {
		try {
			await ratioTrigger({
				params: {
					periods      : getLastMonthData() || monthPayload || filters?.date || undefined,
					cogoEntityId : entityMappingData[filters?.entity] || undefined,
				},
			});

			setShowReport(true);
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [ratioTrigger, getLastMonthData, monthPayload, filters?.date, filters?.entity]);

	return {
		ratiosData,
		fetchRatioApi,
		fetchReportApi,
		reportData,
		reportTriggerLoading,
		ratiosTriggerLoading,
	};
};

export default useReport;
