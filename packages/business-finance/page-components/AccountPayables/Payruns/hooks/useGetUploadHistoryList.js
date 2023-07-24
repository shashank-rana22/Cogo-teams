import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const useGetUploadHistoryList = ({ sort, query, globalFilters }) => {
	const { pageIndex, pageSize, uploadedDate, status } = globalFilters || {};
	const [{ data:uploadHistoryDataList, loading:uploadHistoryListLoading }, uploadHistoryListTrigger] = useRequestBf({
		url     : '/purchase/payment-upload/list',
		method  : 'get',
		authKey : 'get_purchase_payment_upload_list',
	}, { manual: true, autoCancel: false });
	const { selectFromDate, selectToDate } = dateFormatter(uploadedDate);

	const getUploadHistoryList = useCallback(async () => {
		try {
			await uploadHistoryListTrigger({
				params: {
					pageIndex,
					pageSize,
					q        : query !== '' ? query : undefined,
					fromDate : selectFromDate || undefined,
					toDate   : selectToDate || undefined,
					status   : status || undefined,
					...sort,
				},
			});
		} catch (err) {
			Toast.error(err.message || 'somthing went wrong');
		}
	}, [pageIndex, pageSize, query, selectFromDate, selectToDate, sort, status, uploadHistoryListTrigger]);
	return {
		getUploadHistoryList,
		uploadHistoryListLoading,
		uploadHistoryDataList,
	};
};

export default useGetUploadHistoryList;
