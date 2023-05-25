import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

interface GlobalInterface {
	page?:number
	pageLimit?:number
	serviceType?:string
	Amount?:string
	Percentage?:string
	archivedStatus?:string
	search?:string
	Range?:string
	date?:any
	entity?:string

}
const useArchive = ({ toggleValue = '', setShowTab }) => {
	const { query = undefined, debounceQuery } = useDebounceQuery();
	const [particularMonth, setParticularMonth] = useState(false);
	const [apiData, setApiData] = useState({ list: [], totalRecords: 0 });
	const [drillData, setDrillData] = useState({ list: [], totalRecords: 0 });
	const [monthData, setMonthData] = useState({});
	const [globalFilters, setGlobalFilters] = useState<GlobalInterface>({
		page           : 1,
		pageLimit      : 10,
		serviceType    : '',
		Amount         : '',
		Percentage     : '',
		archivedStatus : '',
		search         : '',
		Range          : '',
		entity         : '',
	});

	const {
		Amount = '',
		Percentage = '',
		archivedStatus,
		date,
		serviceType,
		search,
		Range,
		entity,
	} = globalFilters || {};

	const entityDetails = GLOBAL_CONSTANTS.cogoport_entities[entity] || {};

	const { id: entityId } = entityDetails;

	useEffect(() => {
		debounceQuery(search !== '' ? search : undefined);
	}, [debounceQuery, search]);

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

	const refetch = useCallback(async () => {
		try {
			const res = await api({
				params: {
					serviceType : serviceType || undefined,
					entityCode  : entity || undefined,
					entityId    : entityId || undefined,
				},
			});
			setApiData(res.data);
		} catch {
			setApiData({ list: [], totalRecords: 0 });
		}
	}, [api, entity, serviceType, entityId]);

	const [
		{ loading:drillDownArchiveLoading },
		drillDownArchiveTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/archive-shipment/list',
			method  : 'get',
			authKey : 'get_pnl_accrual_archive_shipment_list',
		},
		{ manual: true },
	);

	const getDrillDownArchive = useCallback(async (month) => {
		try {
			const res = await drillDownArchiveTrigger({
				params: {
					period         : format(month.period, 'yyyy-MM-dd') || undefined,
					startDate      : date ? format(date?.startDate, 'yyyy-MM-dd') : undefined,
					endDate        : date ? format(date?.endDate, 'yyyy-MM-dd') : undefined,
					archivedStatus : archivedStatus || undefined,
					serviceType    : serviceType || undefined,
					query,
					Amount         : Amount === '' ? undefined : Amount,
					Percentage     : Percentage === '' ? undefined : Percentage,
					Range          : Range || undefined,
					entityCode     : entity || undefined,
					entityId       : entityId || undefined,
				},
			});
			setDrillData(res.data);
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [Amount,
		Percentage,
		Range,
		archivedStatus,
		date,
		drillDownArchiveTrigger,
		query,
		serviceType,
		entity,
		entityId]);

	useEffect(() => {
		if (!particularMonth) {
			refetch();
		} else {
			getDrillDownArchive(monthData);
		}
	}, [toggleValue, serviceType, archivedStatus, query, particularMonth, monthData, getDrillDownArchive, refetch]);

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
