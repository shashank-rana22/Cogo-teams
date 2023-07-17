import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCNDetails = ({ shipment_data }) => {
	const [{ loading, data }, trigger] = useRequest({
		url: '/list_shipment_credit_notes',

	});
	const getCNData = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id : shipment_data?.id,
						is_active   : true,
					},
				},
			});
		} catch (e) {
			if (e?.message === 'canceled') { return; }
			Toast.error(e?.data);
		}
	}, [shipment_data?.id, trigger]);

	useEffect(() => {
		getCNData();
	}, [getCNData]);

	return {
		loading,
		getCNData,
		data: data || {},
	};
};
export default useGetCNDetails;
