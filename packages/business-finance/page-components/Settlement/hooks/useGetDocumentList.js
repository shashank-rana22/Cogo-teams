import { Toast } from '@cogoport/components';
// import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';
// import { useSelector } from '@cogoport/store';
// import React, {  } from 'react';

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
	// const { query = '', debounceQuery } = useDebounceQuery();
	// useEffect(() => {
	// 	debounceQuery(filters?.query);
	// }, [debounceQuery, filters?.query]);
	const INITIAL_BAL = 0;
	const { status = '', docType = '', accMode = '', date = {}, tradeParty = '', ...rest } = filters || {};
	const [balanceData, setBalanceData] = useState(INITIAL_BAL);
	const balanceRefetch = async () => {
		try {
			if (filters.tradeParty && filters.entityCode) {
				// console.log('filters', filters);

				// const { query = '', date = {}, tradeParty = '', ...rest } = filters || {};
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
						docType               : undefined,
						documentPaymentStatus : undefined,
					},
				});
				setBalanceData(rep.data);
			}
		} catch (error) {
			setBalanceData(INITIAL_BAL);
		}
	};
	const refetch = async () => {
		try {
			if (filters.tradeParty && filters.entityCode) {
				// const { ...res } = filters || {};

				await trigger({
					params: {
						// ...(res || {}),
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

						// query   : query !== '' ? query : undefined,
						docType  : docType || undefined,
						sortBy   : sorting?.sortBy || undefined,
						sortType : sorting?.sortType || undefined,
						...filters.sort,
					},
				});
			}
		} catch (error) {
			// setApiData({});
			Toast.error(error?.error?.message);
		}
	};

	return {
		data,
		loading,
		balanceData,
		accountData,
		accountLoading,
		balanceRefetch,
		refetch,
	};
};
export default useGetDocumentList;
