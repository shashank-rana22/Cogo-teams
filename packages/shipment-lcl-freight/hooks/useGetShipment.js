import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetShipment = () => {
	const [data, setData] = useState({});

	const router = useRouter();
	const { shipment_id:id } = router.query;

	const [{ loading }, trigger] = useRequest({
		url          : 'get_shipment',
		params       : { id },
		service_name : 'shipment',
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();
				setData(res?.data || {});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data,
		apiTrigger,
	};
};

export default useGetShipment;
