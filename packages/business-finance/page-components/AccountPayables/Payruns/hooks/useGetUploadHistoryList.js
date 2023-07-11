import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetUploadHistoryList = ({ sort, query, globalFilters }) => {
	const { pageIndex, pageSize, uploadedDate, status } = globalFilters || {};
	const [{ data:uploadHistoryDataList, loading:uploadHistoryListLoading }, uploadHistoryListTrigger] = useRequestBf({
		url     : '/purchase/payment-upload/list',
		method  : 'get',
		authKey : 'get_purchase_payment_upload_list',
	}, { manual: true, autoCancel: false });
	const selectFromDate =		uploadedDate
		&& formatDate({
			date       : uploadedDate.startDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		});
	const selectToDate =		uploadedDate
		&& formatDate({
			date       : uploadedDate.endDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		});
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
