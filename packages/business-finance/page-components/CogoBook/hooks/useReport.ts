import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface FilterInterface {
	filters?:{
		month?:string
		category?:string
		entity?:string
	}
	monthPayload?:number
}
const useReport = ({
	filters,
	monthPayload,
}:FilterInterface) => {
	const d = new Date();

	const [monthName, year] = ((filters?.month || '').match(/(\w+)\s+(\d{4})/) || []).slice(1);

	const monthData = new Date(`${monthName} 1, ${year}`).getMonth() + 1 || d.getMonth() + 1;

	const numericDate = `${year || d.getFullYear()}-${monthData.toString().padStart(2, '0')}-01`;

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

	const fetchReportApi = useCallback(async (setShowReport) => {
		const entityMapping = {
			101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			201 : 'c7e1390d-ec41-477f-964b-55423ee84700',
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
			401 : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
			501 : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		};
		const getLastMonthData = () => {
			if (filters?.category === 'lastMonth ') {
				const currentDate = new Date();
				currentDate.setMonth(currentDate.getMonth() - 1);
				const yearData = currentDate.getFullYear();
				const month = currentDate.getMonth() + 1;
				const monthValue = month.toString().padStart(2, '0');
				const lastMonth = `${yearData}-${monthValue}-01`;
				return lastMonth;
			}
			return null;
		};

		try {
			await reportTrigger({
				params: {
					periods      : [numericDate] || [getLastMonthData()] || undefined,
					cogoEntityId : entityMapping[filters?.entity] || undefined,
				},
			});

			setShowReport(true);
		} catch {
			console.log('dfjnjn');
		}
	}, [filters?.category, filters?.entity, numericDate, reportTrigger]);

	const fetchRatioApi = useCallback(async (setShowReport?:any) => {
		const entityMapping = {
			101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			201 : 'c7e1390d-ec41-477f-964b-55423ee84700',
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
			401 : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
			501 : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		};
		try {
			await ratioTrigger({
				params: {
					periods      : monthPayload || numericDate || undefined,
					cogoEntityId : entityMapping[filters?.entity] || undefined,
				},
			});

			setShowReport(true);
		} catch {
			console.log('dfjn');
		}
	}, [filters?.entity, monthPayload, numericDate, ratioTrigger]);

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
