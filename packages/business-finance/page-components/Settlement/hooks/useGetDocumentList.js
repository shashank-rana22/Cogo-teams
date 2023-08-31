import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useState, useEffect } from 'react';

export function toastApiError(err) {
	let message = '';
	if (err?.response?.data) {
		if (err.response.data?.base) {
			message = err.response.data.base;
		} else if (err.response.data.message) {
			message = err.response.data.message;
		}
	} else if (err?.message) {
		message = err.message;
	}
	if (message !== 'canceled') { Toast.error(message || 'Something went wrong !!'); }
}

const useGetDocumentList = ({ filters, sorting }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/settlement/documents',
			authKey : 'get_payments_settlement_documents',
			method  : 'get',
		},
		{ manual: true },
	);
	const [{ data:accountData, loading: accountLoading }, balanceTrigger] = useRequestBf(
		{
			url     : 'payments/settlement/account-balance',
			authKey : 'get_payments_settlement_account_balance',
			method  : 'get',
		},
		{ manual: true },
	);

	const { query, debounceQuery } = useDebounceQuery();
	const INITIAL_BAL = 0;
	const { search = '', status = '', docType = '', accMode = '', date = {}, tradeParty = '', ...rest } = filters || {};
	const [balanceData, setBalanceData] = useState(INITIAL_BAL);
	const balanceRefetch = async () => {
		try {
			if (filters.tradeParty && filters.entityCode) {
				const rep = await balanceTrigger({
					params: {
						...rest,
						startDate:
					(date?.startDate
						&& formatDate({
							date       : date?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						})) || undefined,
						endDate:
					(date?.endDate
						&& formatDate({
							date       : date?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						})) || undefined,

						orgId                 : tradeParty,
						accModes              : accMode || undefined,
						query                 : query || undefined,
						docType               : undefined,
						documentPaymentStatus : undefined,
					},
				});
				setBalanceData(rep.data);
			}
		} catch (error) {
			setBalanceData(INITIAL_BAL);
			Toast.error(error?.error?.message);
			toastApiError(error);
		}
	};
	const refetch = async () => {
		try {
			if (filters.tradeParty && filters.entityCode) {
				await trigger({
					params: {
						...rest,
						orgId                 : filters.tradeParty,
						accModes              : accMode || undefined,
						documentPaymentStatus : status || undefined,
						startDate:
                    (filters.date?.startDate
						&& formatDate({
							date       : filters.date?.startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						})) || undefined,
						endDate:
                    (filters.date?.endDate
						&& formatDate({
							date       : filters.date?.endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						})) || undefined,

						docType  : docType || undefined,
						query    : query || undefined,
						sortBy   : sorting?.sortBy || undefined,
						sortType : sorting?.sortType || undefined,
						...filters.sort,
					},
				});
			}
		} catch (error) {
			Toast.error(error?.error?.message);
			toastApiError(error);
		}
	};
	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);
	// useEffect(() => {
	// 	refetch(query);
	// }, [query, refetch]);

	return {
		data,
		loading,
		balanceData,
		accountData,
		accountLoading,
		query,
		balanceRefetch,
		refetch,
	};
};
export default useGetDocumentList;
