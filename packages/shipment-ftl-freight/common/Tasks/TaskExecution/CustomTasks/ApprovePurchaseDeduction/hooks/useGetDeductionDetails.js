import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetDeductionDetails = (watchCN, shipment_data = {}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_purchase_deduction_details',
		method : 'GET',
	}, { manual: true });

	const getDeductionData = useCallback(async () => {
		const payload = {
			shipment_id    : shipment_data?.id,
			credit_note_id : watchCN,
		};

		try {
			await trigger({
				params: payload,
			});
		} catch (e) {
			if (e?.message === 'canceled') { return; }
			Toast.error(getApiErrorString(e?.response?.data) || 'Something went wrong !! ');
		}
	}, [shipment_data?.id, trigger, watchCN]);

	useEffect(() => {
		if (watchCN) {
			getDeductionData();
		}
	}, [watchCN, getDeductionData]);

	return {
		loading,
		getDeductionData,
		data: data || {},
	};
};
export default useGetDeductionDetails;
