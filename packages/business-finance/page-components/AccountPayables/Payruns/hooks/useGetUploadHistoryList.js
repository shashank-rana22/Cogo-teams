import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import { dateFormatter } from '../helpers';

const getUploadHistoryPayload = ({
	pageIndex,
	selectFromDate,
	selectToDate,
	status,
	sort,
	pageSize,
	query,
	activeEntity = '',
}) => ({
	pageIndex,
	pageSize,
	q          : query !== '' ? query : undefined,
	fromDate   : selectFromDate || undefined,
	toDate     : selectToDate || undefined,
	status     : status || undefined,
	...sort,
	entityCode : activeEntity,
});

const useGetUploadHistoryList = ({ sort, query, globalFilters }) => {
	const { pageIndex, pageSize, uploadedDate, status, activeEntity = '' } = globalFilters || {};

	const [{ data, loading },
		uploadHistoryListTrigger] = useRequestBf({
		url     : '/purchase/payment-upload/list',
		method  : 'get',
		authKey : 'get_purchase_payment_upload_list',
	}, { manual: true, autoCancel: false });

	const { selectFromDate, selectToDate } = dateFormatter(uploadedDate);

	const getUploadHistoryList = useCallback(() => {
		const payload = getUploadHistoryPayload({
			pageIndex,
			selectFromDate,
			selectToDate,
			status,
			sort,
			pageSize,
			query,
			activeEntity,
		});

		try {
			uploadHistoryListTrigger({
				params: payload,
			});
		} catch (err) {
			Toast.error(err.message || 'somthing went wrong');
		}
	}, [pageIndex, pageSize, query, selectFromDate, selectToDate, sort, status, uploadHistoryListTrigger,
		activeEntity]);

	return {
		getUploadHistoryList,
		uploadHistoryListLoading : loading,
		uploadHistoryDataList    : data,
	};
};

export default useGetUploadHistoryList;
