import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const STAKEHOLDER_KEY_MAPPING = {
	consignee_shipper_booking_agent : 'consignee_shipper_id',
	booking_agent                   : 'importer_exporter_id',
};

function useGetServices({ shipment_data = {}, additional_methods = [], activeStakeholder = '' }) {
	const [{ loading : servicesLoading }, trigger] = useRequest({
		url    : 'fcl_cfs/get_services',
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

				if (activeStakeholder in STAKEHOLDER_KEY_MAPPING) {
					const servicesToShow = (res?.data?.summary || [])
						.filter((service) => service?.importer_exporter?.id
							=== shipment_data?.[STAKEHOLDER_KEY_MAPPING[activeStakeholder]]);

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
