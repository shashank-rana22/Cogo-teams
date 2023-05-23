import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf, useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useTdsSettlement = ({
	active = '',
	globalFilters,
	setGlobalFilters,
}) => {
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

	useEffect(() => {
		setSummData(summaryData);
	}, [summaryData]);

	const refetch = useCallback(() => {
		(async () => {
			const { orgId = undefined } = rest || {};
			try {
				const response = await trigger({
					params: {
						accMode: active,
						orgId,
						startDate:
						date
						&& formatDate({
							date       : date?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}),
						endDate:
						date
						&& formatDate({
							date       : date?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['00:00:00'],
							formatType : 'dateTime',
							separator  : ' ',
						}),
						query : query || undefined,
						page  : pageIndex,
					},
				});
				setApiTdsData(response.data);
			} catch (err) {
				setApiTdsData({});
			}
		})();
	}, [active, trigger, rest, date, query, pageIndex]);

	const getSummary = useCallback(() => {
		(async () => {
			try {
				const { orgId = undefined } = rest || {};
				await getOrgSummary({
					params: {
						orgId,
						accMode: active,
						startDate:
						date
						&& formatDate({
							date       : date?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						}),

						endDate:
						date
						&& formatDate({
							date       : date?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						}),
						query: query || undefined,
					},
				});
			} catch (err) {
				setSummData({});
			}
		})();
	}, [active, getOrgSummary, rest, date, query]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		if (rest?.orgId) {
			refetch();
			getSummary();
		}
	}, [active, JSON.stringify(query), JSON.stringify(rest?.orgId),
		JSON.stringify(getSummary), JSON.stringify(refetch), pageIndex, JSON.stringify(date)]);

	const approveTds = async (value, setShow, reset) => {
		try {
			const response = await approveTDsApi({
				data: {
					...value,
				},
			});

			if (response?.hasError) return;
			refetch();
			getSummary();
			reset();
			setShow(false);
			Toast.success('Tds Upload  Successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};
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
