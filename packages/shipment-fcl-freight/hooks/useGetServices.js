import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useGetServices({ shipment_data = {}, additional_methods = [] }) {
	const [{ loading : servicesLoading }, trigger] = useRequest({
		url    : 'fcl_freight/get_services',
		method : 'GET',
	}, { manual: true });

	const [servicesData, setServicesData] = useState([]);

	const { id = '' } = shipment_data;

	const listServices = useCallback(
		async () => {
			try {
				const res = await trigger({
					params: {
						shipment_id: id,
						additional_methods,
					},
				});

				setServicesData(res?.data?.summary);
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger, id, additional_methods],
	);

	useEffect(() => {
		if (id) listServices();
	}, [listServices, id]);

	return {
		servicesGet: {
			servicesLoading,
			refetchServices : listServices,
			servicesList    : servicesData,
		},

	};
}

export default useGetServices;
