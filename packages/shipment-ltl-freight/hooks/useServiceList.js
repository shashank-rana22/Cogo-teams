import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useServiceList = () => {
	const router = useRouter();
	const { shipment_id } = router.query;

	const [servicesData, setServicesData] = useState([]);

	const [{ loading : servicesLoading }, trigger] = useRequest({
		url    : '/list_shipment_services',
		method : 'GET',
	}, { manual: true });

	const getServiceList = useCallback((async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						shipment_id,
						status: ['active', 'pending', 'inactive'],
					},
					service_stakeholder_required : true,
					can_edit_booking_params      : true,
					page_limit                   : 100,
				},
			});

			setServicesData(res?.data?.list);
		} catch (e) {
			// toastApiError(e);
		}
	}), [shipment_id, trigger]);

	useEffect(() => {
		getServiceList();
	}, [getServiceList]);

	return {

		servicesGet: {
			servicesLoading,
			refetchServices : getServiceList,
			servicesList    : servicesData,
		},
	};
};

export default useServiceList;
