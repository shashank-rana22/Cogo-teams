import { useRequestBf } from '@cogoport/request';
import { useCallback, useState } from 'react';

const useReport = ({
	filters,
}) => {
	const [reportData, setReportData] = useState({});
	const [ratiosData, setRatioData] = useState({});

	const d = new Date();

	const [monthName, year] = ((filters?.month || '').match(/(\w+)\s+(\d{4})/) || []).slice(1);

	const monthData = new Date(`${monthName} 1, ${year}`).getMonth() + 1 || d.getMonth() + 1;

	const numericDate = `${year || d.getFullYear()}-${monthData.toString().padStart(2, '0')}-01`;

	const [
		{ loading:reportTriggerLoading },
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
		{ loading:ratiosTriggerLoading },
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
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
		};
		try {
			const res = await reportTrigger({
				params: {
					periods      : numericDate || undefined,
					cogoEntityId : entityMapping[filters?.entity] || undefined,
				},
			});
			setReportData(res.data);
			setShowReport(true);
		} catch {
			setReportData({ list: [], totalRecords: 0 });
		}
	}, [filters?.entity, numericDate, reportTrigger]);

	const fetchRatioApi = useCallback(async (setShowReport) => {
		const entityMapping = {
			101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
		};
		try {
			const res = await ratioTrigger({
				params: {
					periods      : numericDate || undefined,
					cogoEntityId : entityMapping[filters?.entity] || undefined,
				},
			});
			setRatioData(res.data);
			setShowReport(true);
		} catch {
			setRatioData({ list: [], totalRecords: 0 });
		}
	}, [filters?.entity, numericDate, ratioTrigger]);

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
