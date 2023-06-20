import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useEscalateToSupplyRm = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/escalate_supplier_to_rm',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const escalateToSupplyRm = useCallback(({ payload }) => {
		try {
			trigger({
				data: payload,
			});
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
