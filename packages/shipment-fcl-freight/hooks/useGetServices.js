import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import toastApiError from '../utils/toastApiError';

function useGetServices({ shipment_data = {}, additional_methods = [], activeStakeholder = '' }) {
	const [{ loading : servicesLoading }, trigger] = useRequest({
		url    : 'fcl_freight/get_services',
		method : 'GET',
	}, { manual: true });

	const [servicesData, setServicesData] = useState([]);

	const { id = '', importer_exporter_id = '', consignee_shipper_id = '' } = shipment_data;

	const listServices = useCallback(
		async () => {
			try {
				const res = await trigger({
					params: {
						shipment_id: id,
						additional_methods,
					},
				});

				if (res.status === 200) {
					setServicesData(res?.data?.summary);
					if (activeStakeholder === 'Kam') {
						const servicesToShow = [];

						(res?.data?.summary || []).forEach((service) => {
							const { importer_exporter = {} } = service;
							if (importer_exporter?.id === importer_exporter_id) {
								servicesToShow.push(service);
							}
						});
						setServicesData(servicesToShow);
					}

					if (activeStakeholder === 'DKam') {
						const servicesToShow = [];

						(res?.data?.summary || []).forEach((service) => {
							if (service?.importer_exporter_id === consignee_shipper_id) {
								servicesToShow.push(service);
							}
						});

						setServicesData(servicesToShow);
					}
				}
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger,
			id,
			additional_methods,
			activeStakeholder,
			consignee_shipper_id,
			importer_exporter_id],
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
