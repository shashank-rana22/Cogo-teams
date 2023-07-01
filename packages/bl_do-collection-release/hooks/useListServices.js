import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

function useListServices({ shipment_id = {}, shipment_type }) {
	const [{ loading : servicesLoading }, trigger] = useRequest({
		url    : `${shipment_type}/get_services`,
		method : 'GET',
		params : {
			shipment_id,
		},
	}, { manual: true });

	const [servicesList, setservicesList] = useState([]);

	const listServices = useCallback(
		async () => {
			try {
				const res = await trigger();

				setservicesList(res?.data?.summary);
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger],
	);

	useEffect(() => {
		listServices();
	}, [listServices]);

	return {
		servicesLoading,
		refetchServices: listServices,
		servicesList,
	};
}

export default useListServices;
