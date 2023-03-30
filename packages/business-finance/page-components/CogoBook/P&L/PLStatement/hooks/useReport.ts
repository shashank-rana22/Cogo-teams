import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useReport = ({
    filters
}) => {
    const { query = undefined, debounceQuery } = useDebounceQuery();
    const  [reportData, setReportData] = useState({});
    const [ratiosData, setRatioData] = useState({})

    const d = new Date();

    const [monthName, year] = (filters?.month.match(/(\w+)\s+(\d{4})/) || []).slice(1);

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
			url     : '/pnl/statement/list',
			method  : 'get',
			authKey : 'get_pnl_statement_list',
		},
		{ manual: true },
	);

    const fetchReportApi = useCallback(async () => {
		try {
			const res = await reportTrigger({
				params: {
					periods: [numericDate]
				},
			});
			setReportData(res.data);
		} catch {
			setReportData({ list: [], totalRecords: 0 });
		}
	}, [reportTrigger]);

    const fetchRatioApi = useCallback(async () => {
		try {
			const res = await ratioTrigger({
				params: {
					periods: [numericDate],
                    cogo_entity_id: filters?.entity
				},
			});
			setRatioData(res.data);
		} catch {
			setRatioData({ list: [], totalRecords: 0 });
		}
	}, [reportTrigger]);

    useEffect (()=>{
        fetchRatioApi()
        fetchReportApi
    },[filters])

    return {
        ratiosData,
        reportData,
        reportTriggerLoading,
        ratiosTriggerLoading
    }

}


export default useReport;