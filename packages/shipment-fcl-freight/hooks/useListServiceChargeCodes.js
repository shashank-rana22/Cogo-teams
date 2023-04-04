import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListServiceChargeCodes = ({ shipmentId, services, isSeller = false }) => {
	const [filters, setFilters] = useState({
		name         : undefined,
		service_type : undefined,
	});

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_shipment_additional_service_codes',
		method : 'GET',
	});

	useEffect(() => {
		(async () => {
			try {
				if (shipmentId) {
					await trigger({
						params: { filters: { shipment_id: shipmentId } },
					});
				}
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, shipmentId]);

	let intialList = (data?.list || []).map((item) => ({
		...item,
		shipmentId,
		services,
		isSeller,
		name: `${item.code} ${startCase(item.name)}`,
	}));

	if (filters.name) {
		intialList = intialList.filter((item) => item.name.toLowerCase().includes(filters.name.toLowerCase()));
	}

	if (filters.service_type) {
		intialList = intialList.filter((item) => {
			if (filters?.service_type?.includes('?')) {
				return item.service_type === filters?.service_type?.split('?')?.[0];
			}
			return item.service_type === filters?.service_type;
		});
	}

	return {
		loading,
		apiList           : data,
		list              : intialList,
		serviceCountTotal : data?.length || 0,
		filters,
		setFilters        : (values) => setFilters({ ...filters, ...values }),
	};
};
export default useListServiceChargeCodes;
// TODO
