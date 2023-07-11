import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPaidAdvanceList = ({ activePayrunTab, query, globalFilters }) => {
	const { pageIndex, pageSize, selectDate, cogoBankId } = globalFilters || {};
	const [{ data:paidAdvanceListData, loading:paidAdvanceListLoading }, paidAdvanceListTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill/list-paid-advance-doc',
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_advance_doc',
	}, { manual: true, autoCancel: false });
	const selectFromDate =		selectDate
	&& formatDate({
		date       : selectDate.startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const selectToDate =		selectDate
	&& formatDate({
		date       : selectDate.endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const getAdvancePaidData = useCallback(() => {
		try {
			paidAdvanceListTrigger({
				params: {
					pageIndex,
					pageSize,
					state      : activePayrunTab,
					q          : query !== '' ? query : undefined,
					startDate  : selectFromDate || undefined,
					endDate    : selectToDate || undefined,
					cogoBankId : cogoBankId || undefined,
				},
			});
		} catch (err) {
			Toast.error(err.message, 'Somthing Went wrong');
		}
	}, [paidAdvanceListTrigger, pageIndex, pageSize, activePayrunTab, query, selectFromDate, selectToDate, cogoBankId]);

	return {
		getAdvancePaidData,
		paidAdvanceListData,
		paidAdvanceListLoading,
	};
};

export default useGetPaidAdvanceList;
