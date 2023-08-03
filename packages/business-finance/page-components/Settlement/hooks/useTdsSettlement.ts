import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf, useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

interface GenericObject {
	[key: string]: any;
}
interface Props {
	active?:string
	globalFilters?: GenericObject,
	setGlobalFilters?: (p:object)=> void,
}
const useTdsSettlement = ({
	active = '',
	globalFilters,
	setGlobalFilters,
}:Props) => {
	const { date = {}, pageIndex, ...rest } = globalFilters;
	const [searchValue, setSearchValue] = useState<string>('');
	const [apiTdsData, setApiTdsData] = useState({});
	const [summData, setSummData] = useState({});

	const { query, debounceQuery } = useDebounceQuery();

	const [{ loading: tdsDocumentsLoading }, trigger] = useRequestBf(
		{
			url     : 'payments/settlement/tds/documents',
			method  : 'get',
			authKey : 'get_payments_settlement_tds_documents',
		},
		{ manual: true },
	);

	const [{ data:summaryData }, getOrgSummary] = useRequestBf(
		{
			url     : 'payments/settlement/org-summary',
			method  : 'get',
			authKey : 'get_payments_settlement_org_summary',
		},
		{ manual: true },
	);
	const [{ loading: editTdsLoading }, approveTDsApi] = useRequest(
		{
			url    : 'update_organization_trade_party',
			method : 'post',
		},
		{ manual: true },
	);

	const { orgId = undefined } = rest || {};
	const dateValue = JSON.stringify(date || {});

	const isDateApplied = Object.keys(JSON.parse(dateValue)).length > 0;

	const refetch = useCallback(() => {
		(async () => {
			try {
				const response = await trigger({
					params: {
						accMode: active,
						orgId,

						startDate: isDateApplied ? formatDate({
							date       : JSON.parse(dateValue)?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}) : undefined,

						endDate: isDateApplied ? formatDate({
							date       : JSON.parse(dateValue)?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}) : undefined,
						query : query || undefined,
						page  : pageIndex,
					},
				});
				setApiTdsData(response.data);
			} catch (err) {
				setApiTdsData({});
			}
		})();
	}, [active, trigger, orgId, dateValue, isDateApplied, query, pageIndex]);

	const getSummary = useCallback(() => {
		(async () => {
			try {
				await getOrgSummary({
					params: {
						orgId,
						accMode: active,

						startDate: isDateApplied ? formatDate({
							date       : JSON.parse(dateValue)?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						}) : undefined,

						endDate: isDateApplied ? formatDate({
							date       : JSON.parse(dateValue)?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						}) : undefined,
						query: query || undefined,
					},
				});
			} catch (err) {
				setSummData({});
			}
		})();
	}, [
		active,
		getOrgSummary,
		orgId,
		isDateApplied,
		dateValue,
		query,
	]);

	const approveTds = async (value, setShow, reset) => {
		try {
			await approveTDsApi({
				data: {
					...value,
				},
			});

			refetch();
			getSummary();
			reset();
			setShow(false);
			Toast.success('Tds Upload  Successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.data) || 'Something went wrong');
		}
	};

	useEffect(() => {
		setSummData(summaryData);
	}, [summaryData]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		if (orgId) {
			refetch();
			getSummary();
		}
	}, [active, query, orgId, refetch, getSummary, pageIndex, dateValue]);

	return {
		data: apiTdsData,
		globalFilters,
		setGlobalFilters,
		setApiTdsData,
		summData,
		searchValue,
		setSearchValue,
		setSummData,
		editTdsLoading,
		approveTds,
		tdsDocumentsLoading,
	};
};

export default useTdsSettlement;
