import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const activeStakeholderMapping = {
	consignee_shipper_booking_agent : 'consignee_shipper_id',
	booking_agent                   : 'importer_exporter_id',
};

function useGetServices({ shipment_data = {}, additional_methods = [], activeStakeholder = '' }) {
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

				if (activeStakeholder in activeStakeholderMapping) {
					const servicesToShow = (res?.data?.summary || [])
						.filter((service) => service?.importer_exporter?.id
							=== shipment_data?.[activeStakeholderMapping[activeStakeholder]]);

					setServicesData(servicesToShow);
				} else {
					setServicesData(res?.data?.summary);
				}
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger, id, additional_methods, activeStakeholder, shipment_data],
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
