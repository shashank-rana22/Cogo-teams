import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useGetUploadHistoryList = () => {
	const [{ data:uploadHistoryDataList, loading:uploadHistoryListLoading }, uploadHistoryListTrigger] = useRequestBf({
		url     : '/purchase/payment-upload/list',
		method  : 'get',
		authKey : 'get_purchase_payment_upload_list',
	}, { manual: true, autoCancel: false });
	const getUploadHistoryList = useCallback(async () => {
		try {
			await uploadHistoryListTrigger({
				params: {
					pageIndex : 1,
					pageSize  : 10,
				},
			});
		} catch (err) {
			Toast.error(err.message || 'somthing went wrong');
		}
	}, [uploadHistoryListTrigger]);
	return {
		getUploadHistoryList,
		uploadHistoryListLoading,
		uploadHistoryDataList,
	};
};

export default useGetUploadHistoryList;
