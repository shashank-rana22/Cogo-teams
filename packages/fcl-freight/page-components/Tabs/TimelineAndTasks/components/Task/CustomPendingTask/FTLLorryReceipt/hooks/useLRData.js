import { useEffect } from 'react';
import { useRequest, useScope } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';

const useGetLRData = () => {
	const { scope } = useScope();
	const { loading, data, trigger } = useRequest(
		'get',
		false,
		scope,
	)('/get_auto_lr_generation_data');

	const getlrData = async (sid) => {
		const payload = {
			shipment_id: sid,
		};

		try {
			await trigger({
				params: payload,
			});
		} catch (e) {
			toast.error(e.data);
		}
	};

	useEffect(() => {
		getlrData();
	}, []);

	return {
		loading,
		getlrData,
		data: data || {},
	};
};
export default useGetLRData;
