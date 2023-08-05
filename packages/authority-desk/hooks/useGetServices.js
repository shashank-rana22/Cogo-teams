import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useGetServices({ shipment_data = {} }) {
	const [servicesData, setServicesData] = useState([]);

	const [{ loading : servicesLoading }, trigger] = useRequest({
		url    : 'fcl_freight/get_services',
		method : 'GET',
	}, { manual: true });

	const { id = '' } = shipment_data;

	const listServices = useCallback(
		async () => {
			try {
				const res = await trigger({
					params: {
						shipment_id: id,
					},
				});

				setServicesData(res?.data?.summary);
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger, id],
	);

	useEffect(() => {
		if (id) listServices();
	}, [listServices, id]);

	return {
		servicesList: servicesData,
		servicesLoading,

	};
}

export default useGetServices;
