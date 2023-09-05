import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import { getFormatDates } from '../utils/getFormatDate';

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

const useGetDocumentList = ({
	filters = {}, sorting = {},
	setMatchModalShow = () => {},
	setSelectedData = () => {},
}) => {
	const { profile } = useSelector((state) => state || {});

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
	const [{ loading: settleLoading }, settleTrigger] = useRequestBf(
		{
			url     : 'payments/settlement/settle',
			method  : 'POST',
			authKey : 'post_payments_settlement_settle',
		},
		{ manual: true },
	);

	const { query, debounceQuery } = useDebounceQuery();
	const INITIAL_BAL = 0;
	const {
		search = '', status = '', docType = '', accMode = '', date = {}, tradeParty = '', entityCode, sort, ...rest
	} = filters || {};
	const [balanceData, setBalanceData] = useState(INITIAL_BAL);
	const balanceRefetch = async () => {
		try {
			if (tradeParty && entityCode) {
				const rep = await balanceTrigger({
					params: {
						...rest,
						startDate             : (date?.startDate && getFormatDates(date?.startDate)) || undefined,
						endDate               : (date?.endDate && getFormatDates(date?.endDate)) || undefined,
						orgId                 : tradeParty,
						accModes              : accMode || undefined,
						query                 : query || undefined,
						docType               : undefined,
						documentPaymentStatus : undefined,
						entityCode,
					},
				});
				setBalanceData(rep.data);
			}
		} catch (error) {
			setBalanceData(INITIAL_BAL);
			// Toast.error(error?.error?.message);
			toastApiError(error);
		}
	};
	const refetch = async () => {
		try {
			if (tradeParty && entityCode) {
				await trigger({
					params: {
						...rest,
						orgId                 : tradeParty,
						accModes              : accMode || undefined,
						documentPaymentStatus : status || undefined,
						startDate             : (date?.startDate && getFormatDates(date?.startDate)) || undefined,
						endDate               : (date?.endDate && getFormatDates(date?.endDate)) || undefined,
						docType               : docType || undefined,
						query                 : query || undefined,
						sortBy                : sorting?.sortBy || undefined,
						sortType              : sorting?.sortType || undefined,
						entityCode,
						...sort,
					},
				});
			}
		} catch (error) {
			toastApiError(error);
		}
	};
	const submitSettleMatch = async ({ updatedData, date:settleDate, fileValue }) => {
		try {
			const response = await settleTrigger({
				data: {
					stackDetails     : updatedData,
					settlementDate   : getFormatDates(settleDate) || undefined,
					createdBy        : profile?.user?.id,
					supportingDocUrl : fileValue,
				},
			});
			if (response?.hasError) return;
			setMatchModalShow(false);
			refetch();
			setSelectedData([]);
			Toast.success('Settle successfully');
		} catch (error) {
			Toast.error(error?.data?.message);
		}
	};

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	return {
		data,
		loading,
		balanceData,
		accountData,
		accountLoading,
		query,
		balanceRefetch,
		refetch,
		submitSettleMatch,
		settleLoading,
	};
};
export default useGetDocumentList;
