import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';
import { getFormatDates } from '../utils/getFormatDate';

const INITIAL_BAL = 0;
const useGetDocumentList = ({
	filters = {}, sorting = {},
	setMatchModalShow = () => {},
	setSelectedData = () => {},
	t = () => {}, setFromCreateJv = () => {},
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

	const { query = '', debounceQuery = () => {} } = useDebounceQuery();
	const {
		search = '', status = '', docType = '', accMode = '', date = {}, tradeParty = '',
		entityCode, page = '1', pageLimit = 10,
	} = filters || {};
	const { startDate = '', endDate = '' } = date || {};
	const { sortBy = '', sortType = '' } = sorting || {};
	const [balanceData, setBalanceData] = useState(INITIAL_BAL);
	const balanceRefetch = useCallback(() => {
		(async () => {
			try {
				if (tradeParty && entityCode) {
					const rep = await balanceTrigger({
						params: {
							page,
							pageLimit,
							startDate             : (startDate && getFormatDates(startDate)) || undefined,
							endDate               : (endDate && getFormatDates(endDate)) || undefined,
							orgId                 : tradeParty,
							accModes              : accMode || undefined,
							docType               : undefined,
							documentPaymentStatus : undefined,
							entityCode,
						},
					});
					setBalanceData(rep?.data);
				}
			} catch (error) {
				setBalanceData(INITIAL_BAL);
				toastApiError(error);
			}
		})();
	}, [accMode, balanceTrigger, endDate, entityCode, page, pageLimit, startDate, tradeParty]);
	const refetch = useCallback((jvSearch = '') => {
		(async () => {
			try {
				if (tradeParty && entityCode) {
					if (!isEmpty(jvSearch)) {
						await trigger({
							params: {
								page      : 1,
								pageLimit : 10,
								orgId     : tradeParty,
								query     : jvSearch || query || undefined,
								entityCode,
							},
						});
						setFromCreateJv(true);
					} else {
						await trigger({
							params: {
								page,
								pageLimit,
								orgId                 : tradeParty,
								accModes              : accMode || undefined,
								documentPaymentStatus : status || undefined,
								startDate             : (startDate && getFormatDates(startDate)) || undefined,
								endDate               : (endDate && getFormatDates(endDate)) || undefined,
								docType               : docType || undefined,
								query                 : query || undefined,
								sortBy                : sortBy || undefined,
								sortType              : sortType || undefined,
								entityCode,
							},
						});
					}
				}
			} catch (error) {
				toastApiError(error);
			}
		})();
	}, [accMode, docType, endDate, entityCode, page, pageLimit, query,
		setFromCreateJv, sortBy, sortType, startDate, status, tradeParty, trigger]);
	const submitSettleMatch = async ({
		updatedData = [], date:settleDate = '',
		fileValue = {}, setSettleConfirmation = () => {},
	}) => {
		try {
			const response = await settleTrigger({
				data: {
					stackDetails     : updatedData,
					settlementDate   : getFormatDates(settleDate) || undefined,
					createdBy        : profile?.user?.id,
					supportingDocUrl : fileValue?.finalUrl,
				},
			});
			if (response?.hasError) return;
			setMatchModalShow(false);
			refetch();
			setSelectedData([]);
			setSettleConfirmation(false);
			Toast.success(t('settlement:settle_success_message'));
		} catch (error) {
			Toast.error(error?.response?.data?.message || error?.message
				|| t('settlement:something_went_wrong_message'));
		}
	};

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	useEffect(() => {
		balanceRefetch();
	}, [balanceRefetch]);
	useEffect(() => {
		refetch();
	}, [refetch, query]);
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
