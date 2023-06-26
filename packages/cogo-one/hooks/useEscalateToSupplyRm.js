import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useEscalateToSupplyRm = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/escalate_supplier_to_rm',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const escalateToSupplyRm = useCallback(async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Escalted Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	}, [trigger]);

	return {
		escalateToSupplyRm,
		supplierLoading: loading,
	};
};
export default useEscalateToSupplyRm;
