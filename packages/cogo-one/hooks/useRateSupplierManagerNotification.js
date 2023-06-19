import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useRateSupplierManagerNotification = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/rate_supplier_manager_notification',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const rateSupplierManagerNotification = useCallback(async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	}, [trigger]);

	return {
		rateSupplierManagerNotification,
		supplierLoading: loading,
	};
};
export default useRateSupplierManagerNotification;
