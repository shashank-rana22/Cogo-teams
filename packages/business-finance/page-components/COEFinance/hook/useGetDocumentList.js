import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

// import toastApiError from '../../commons/';
import toastApiError from '../../commons/toastApiError.ts';
// import { getFormatDate } from '../ShipmentAuditFunctions/utils/getFormatDate';
// import {getFormatDates}
// const INITIAL_BAL = 0;
const useGetDocumentList = ({
	paginationFilters = {},
	search,
	activeTab,
}) => {
	// const { profile } = useSelector((state) => state || {});

	const CLOSING_STATUS = activeTab === 'operational_close' ? 'OPR_CLOSED' : 'CLOSED';
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/common/job-profitability/list-jobs-stats',
			authKey : 'get_common_job_profitability_list_jobs_stats',
			method  : 'get',
		},
		{ manual: true },
	);
	// const [{ data:accountData, loading: accountLoading }, balanceTrigger] = useRequestBf(
	// 	{
	// 		url     : 'payments/settlement/account-balance',
	// 		authKey : 'get_payments_settlement_account_balance',
	// 		method  : 'get',
	// 	},
	// 	{ manual: true },
	// );
	// const [{ loading: settleLoading }, settleTrigger] = useRequestBf(
	// 	{
	// 		url     : 'payments/settlement/settle',
	// 		method  : 'POST',
	// 		authKey : 'post_payments_settlement_settle',
	// 	},
	// 	{ manual: true },
	// );
	// {
	// 	Service               : null,
	// 	Entity                : null,
	// 	walletUsed            : null,
	// 	operationalClosedDate : null,
	// 	creationDate          : null,
	// }

	const { query = '', debounceQuery = () => {} } = useDebounceQuery();
	const { page = 1, pageLimit = 10 } = paginationFilters || {};
	// const { startDate = '', endDate = '' } = date || {};
	// const { sortBy = '', sortType = '' } = sorting || {};
	// const [balanceData, setBalanceData] = useState(INITIAL_BAL);
	// const balanceRefetch = useCallback(() => {
	// 	(async () => {
	// 		try {
	// 			if (tradeParty && entityCode) {
	// 				const rep = await balanceTrigger({
	// 					params: {
	// 						page,
	// 						pageLimit,
	// 						startDate             : (startDate && getFormatDates(startDate)) || undefined,
	// 						endDate               : (endDate && getFormatDates(endDate)) || undefined,
	// 						orgId                 : tradeParty,
	// 						accModes              : accMode || undefined,
	// 						// query                 : query || undefined,
	// 						docType               : undefined,
	// 						documentPaymentStatus : undefined,
	// 						entityCode,
	// 					},
	// 				});
	// 				setBalanceData(rep?.data);
	// 			}
	// 		} catch (error) {
	// 			setBalanceData(INITIAL_BAL);
	// 			toastApiError(error);
	// 		}
	// 	})();
	// }, [accMode, balanceTrigger, endDate, entityCode, page, pageLimit, startDate, tradeParty]);
	const refetch = useCallback((filters = {}) => {
		(async () => {
			// console.log(filters, 'gwvh');
			const {
				Service = '', Entity = '',
				// operationalClosedDate = '', creationDate = '',
				walletUsed = '', tradeType = '',
				//  page = '1', pageLimit = 10,
			} = filters || {};
			try {
				await trigger({
					params: {
						currentState : CLOSING_STATUS,
						pageIndex    : page,
						pageSize     : pageLimit,
						serviceType  : Service || undefined,
						entityCode   : Entity || undefined,
						tradeType    : tradeType || undefined,
						// operationalClosedDate : operationalClosedDate || undefined,
						// operationalClosedDate:
						// (operationalClosedDate && getFormatDate(operationalClosedDate)) || undefined,
						// creationDate : (creationDate && getFormatDate(creationDate)) || undefined,
						// docType      : docType || undefined,
						query        : query || undefined,
						walletUsed   : walletUsed || undefined,
					},
				});
			} catch (error) {
				toastApiError(error);
			}
		})();
	}, [CLOSING_STATUS, page, pageLimit, query, trigger]);
	// const deleteHistory = async ({ item }) => {
	// 	const { documentNo, accountType } = item || {};
	// 	try {
	// 		await deleteHistoryTriggerApi({
	// 			params: {
	// 				documentNo,
	// 				settlementType : accountType,
	// 				deletedBy      : profile?.user?.id,
	// 			},
	// 			data: {},
	// 		});

	// 		Toast.success('Deleted Successfully');
	// 		refetch();
	// 	} catch (error) {
	// 		Toast.error(error?.response?.data?.message);
	// 	}
	// 	setShowDeleteConfirmationModal(false);
	// };

	// const refetch = async ({ filters }) => {
	// 	try {
	// 		await trigger({
	// 			params: {
	// 				page,
	// 				pageLimit,
	// 				orgId                 : tradeParty,
	// 				accModes              : accMode || undefined,
	// 				documentPaymentStatus : status || undefined,
	// 				startDate             : (startDate && getFormatDates(startDate)) || undefined,
	// 				endDate               : (endDate && getFormatDates(endDate)) || undefined,
	// 				docType               : docType || undefined,
	// 				query                 : query || undefined,
	// 				sortBy                : sortBy || undefined,
	// 				sortType              : sortType || undefined,
	// 				entityCode,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		toastApiError(error);
	// 	}
	// };

	// const submitSettleMatch = async ({
	// 	updatedData = [], date:settleDate = '',
	// 	fileValue = {}, setSettleConfirmation = () => {},
	// }) => {
	// 	try {
	// 		const response = await settleTrigger({
	// 			data: {
	// 				stackDetails     : updatedData,
	// 				settlementDate   : getFormatDates(settleDate) || undefined,
	// 				createdBy        : profile?.user?.id,
	// 				supportingDocUrl : fileValue?.finalUrl,
	// 			},
	// 		});
	// 		if (response?.hasError) return;
	// 		setMatchModalShow(false);
	// 		refetch();
	// 		setSelectedData([]);
	// 		setSettleConfirmation(false);
	// 		Toast.success('Settle successfully');
	// 	} catch (error) {
	// 		Toast.error(error?.response?.data?.message || error?.message || 'Something went wrong');
	// 	}
	// };

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	useEffect(() => {
		refetch();
	}, [refetch, query]);
	return {
		data,
		loading,
		query,
		refetch,
	};
};
export default useGetDocumentList;
