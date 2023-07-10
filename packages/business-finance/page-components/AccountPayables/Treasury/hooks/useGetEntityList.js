import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const CHECK_LIST_EMPTY = 0;

const useGetEntityList = () => {
	const [entityFilters, setEntityFilters] = useState({
		activeEntity   : '301',
		entityRequest  : 'all',
		entityCurrency : 'all',
		reportTime     : 'day',
		reportCurrency : 'INR',
		search         : '',
		date           : {},
		pageIndex      : 1,
		pageSize       : 10,
	});

	const isReportActiveEntity = entityFilters?.activeEntity === 'reports';

	const {
		pageIndex, pageSize, search, date, activeEntity,
		entityRequest, entityCurrency, reportTime, reportCurrency,
	} =		entityFilters;

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const [
		{ data: entityListData, loading:entityListLoading },
		entityListApi,
	] = useRequestBf(
		{
			url     : '/purchase/treasury/live-status',
			method  : 'get',
			authKey : 'get_purchase_treasury_live_status',
		},
		{ manual: true },
	);

	const [
		{ data:reportsListData, loading:reportsListLoading },
		reportsListApi,
	] = useRequestBf(
		{
			url     : '/purchase/treasury/report',
			method  : 'get',
			authKey : 'get_purchase_treasury_report',
		},
		{ manual: true },
	);

	const api = isReportActiveEntity ? reportsListApi : entityListApi;

	const selectFromDate =		date?.startDate
		&& formatDate({
			date       : date.startDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		});

	const selectToDate =		date?.endDate
		&& formatDate({
			date       : date.endDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		});
	const view = isReportActiveEntity ? entityFilters?.reportTime : undefined;

	const refetch = useCallback(async () => {
		try {
			await api({
				params: {
					accNo      : query || undefined,
					entityCode : isReportActiveEntity ? undefined : entityFilters?.activeEntity,
					request    : isReportActiveEntity ? undefined : entityFilters?.entityRequest,
					currency   : isReportActiveEntity
						? entityFilters?.reportCurrency : entityFilters?.entityCurrency,
					viewBy    : selectFromDate && selectToDate ? 'date_Range' : view,
					fromDate  : isReportActiveEntity ? selectFromDate : undefined,
					toDate    : isReportActiveEntity ? selectToDate : undefined,
					pageIndex : isReportActiveEntity ? pageIndex : undefined,
					pageSize  : isReportActiveEntity ? pageSize : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	}, [api, entityFilters?.activeEntity, entityFilters?.entityCurrency,
		entityFilters?.entityRequest, entityFilters?.reportCurrency, isReportActiveEntity,
		pageIndex, pageSize, query, selectFromDate, selectToDate, view]);
	const filtervalue = Object.values(entityFilters);

	const filterClear = filtervalue.filter((item) => {
		if (Array.isArray(item) && item.length === CHECK_LIST_EMPTY) {
			return false;
		}
		return item !== undefined && item !== '';
	});

	const clearFilters = () => {
		setEntityFilters({
			pageIndex : 1,
			pageSize  : 10,
		});
	};

	useEffect(() => {
		refetch();
	}, [query, pageIndex, activeEntity, entityCurrency, entityRequest, reportTime, reportCurrency, date, refetch]);

	return {
		entityFilters,
		setEntityFilters,
		refetch,
		entityListData,
		reportsListData,
		entityListLoading,
		reportsListLoading,
		filterClear,
		clearFilters,
	};
};

export default useGetEntityList;
