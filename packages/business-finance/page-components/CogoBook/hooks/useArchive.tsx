import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useArchive = ({ toggleValue = '', setShowTab }) => {
	const { query = undefined, debounceQuery } = useDebounceQuery();
	const [particularMonth, setParticularMonth] = useState(false);
	const [apiData, setApiData] = useState({ list: [] });
	const [drillData, setDrillData] = useState({ list: [] });
	const [monthData, setMonthData] = useState({});
	const [globalFilters, setGlobalFilters] = useState({
		page           : 1,
		pageLimit      : 10,
		serviceType    : '',
		Amount         : '',
		Percentage     : '',
		archivedStatus : '',
		search         : '',
		Range          : '',
		date           : { startDate: '', endDate: '' },
	});

	const {
		Amount = '',
		Percentage = '',
		archivedStatus,
		date,
		serviceType,
		search,
		Range,
		...rest
	} = globalFilters || {};

	useEffect(() => {
		debounceQuery(search !== '' ? search : undefined);
	}, [search]);

	const [
		{ loading:declaredTriggerLoading },
		declaredTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/accrual/archive/declared/list',
			method  : 'get',
			authKey : 'get_pnl_accrual_archive_declared_list',
		},
		{ manual: true },
	);

	const [
		{ loading:actualTriggerLoading },
		actualTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/accrual/archive/actual/list',
			method  : 'get',
			authKey : 'get_pnl_accrual_archive_actual_list',
		},
		{ manual: true },
	);

	const api = toggleValue === 'declared' ? declaredTrigger : actualTrigger;

	const refetch = async () => {
		try {
			const res = await api({
				params: {
					serviceType: serviceType || undefined,
					...rest,
				},
			});
			setApiData(res.data);
		} catch {
			setApiData({ list: [] });
		}
	};

	const [
		{ loading:drillDownArchiveLoading },
		drillDownArchiveTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/archive-shipment/list',
			method  : 'get',
			authKey : 'get_pnl_accrual_archive-shipment_list',
		},
		{ manual: true },
	);

	const getDrillDownArchive = async (month) => {
		try {
			const res = await drillDownArchiveTrigger({
				params: {
					period         : month.period || undefined,
					startDate      : format(date?.startDate, 'yyyy MM dd') || undefined,
					endDate        : format(date?.endDate, 'yyyy MM dd') || undefined,
					archivedStatus : archivedStatus || 'BOOKED' || undefined,
					serviceType    : serviceType || undefined,
					query,
					Amount         : Amount === '' ? undefined : Amount,
					Percentage     : Percentage === '' ? undefined : Percentage,
					Range          : Range || undefined,
				},
			});
			setDrillData(res.data);
		} catch (error) {
			Toast.error(error);
		}
	};

	useEffect(() => {
		if (!particularMonth) {
			refetch();
		} else {
			getDrillDownArchive(monthData);
		}
	}, [toggleValue, serviceType, archivedStatus, query, particularMonth, refetch, monthData]);

	const clickHandler = () => {
		setParticularMonth(!particularMonth);
		setShowTab(true);
		refetch();
	};

	return {
		apiData,
		drillData,
		monthData,
		particularMonth,
		clickHandler,
		globalFilters,
		setGlobalFilters,
		setParticularMonth,
		Amount,
		setMonthData,
		Percentage,
		refetch,
		getDrillDownArchive,
		loading:
        actualTriggerLoading
			|| declaredTriggerLoading
			|| drillDownArchiveLoading,
	};
};

export default useArchive;
