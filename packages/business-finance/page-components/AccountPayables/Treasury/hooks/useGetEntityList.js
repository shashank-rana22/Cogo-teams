import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

const geo = getGeoConstants();

const useGetEntityList = () => {
	const getCurrenyCode = geo.country.currency.code;
	const profile = useSelector((state) => state);
	const {
		profile: { partner },
	} = profile || {};
	const { id: partnerId } = partner || {};

	const entity = getDefaultEntityCode(partnerId);

	const [entityFilters, setEntityFilters] = useState({
		activeEntity   : entity,
		entityRequest  : 'all',
		entityCurrency : '',
		reportTime     : 'day',
		reportCurrency : getCurrenyCode,
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
	const view = isReportActiveEntity ? reportTime : undefined;

	const refetch = useCallback(async () => {
		try {
			await api({
				params: {
					accNo      : query || undefined,
					entityCode : isReportActiveEntity ? undefined : activeEntity,
					request    : isReportActiveEntity ? undefined : entityRequest,
					currency   : isReportActiveEntity
						? reportCurrency : entityCurrency || 'all',
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
	}, [activeEntity, api, entityCurrency, entityRequest,
		isReportActiveEntity, pageIndex, pageSize, query, reportCurrency, selectFromDate, selectToDate, view]);
	const filtervalue = Object.values(entityFilters);

	const filterClear = filtervalue.filter((item) => {
		if (Array.isArray(item) && isEmpty(item)) {
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
