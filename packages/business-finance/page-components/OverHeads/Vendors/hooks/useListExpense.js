import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useContext, useCallback } from 'react';

import { EntityContext } from '../../commons/Contexts';

const formatedDate = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
	formatType : 'dateTime',
	separator  : 'T',
});

const useListExpense = ({ filters }) => {
	const entity = useContext(EntityContext);
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/list',
			method  : 'get',
			authKey : 'get_purchase_expense_list',
		},
		{ manual: true },
	);

	const { dueDate, uploadDate, billDate	} = filters;
	const { startDate, endDate } = dueDate || {};
	const { startDate: fromUploadBillDate, endDate: toUploadBillDate } = uploadDate || {};
	const { startDate: fromBillDate, endDate: toBillDate } = billDate || {};

	const getList = useCallback(async ({ vendorId, expenseType, pageIndex, pageSize }) => {
		try {
			await trigger({
				params: {
					expenseType,
					pageSize,
					pageIndex,
					organizationId     : vendorId,
					startDate          : startDate ? formatedDate(startDate) : undefined,
					endDate            : endDate ? formatedDate(endDate) : undefined,
					fromUploadBillDate : fromUploadBillDate ? formatedDate(fromUploadBillDate) : undefined,
					toUploadBillDate   : toUploadBillDate ? formatedDate(toUploadBillDate) : undefined,
					fromBillDate       : fromBillDate ? formatedDate(fromBillDate) : undefined,
					toBillDate         : toBillDate ? formatedDate(toBillDate) : undefined,
					cogoEntityId       : entity,
					status             : 'FINANCE_ACCEPTED',
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, startDate, endDate, fromUploadBillDate, toUploadBillDate, fromBillDate, entity, toBillDate]);

	return {
		getList,
		listData    : data,
		listLoading : loading,
	};
};

export default useListExpense;
