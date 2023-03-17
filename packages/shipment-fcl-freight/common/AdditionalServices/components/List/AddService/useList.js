import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useList = ({ shipment_id, services, isSeller = false, show }) => {
	const scope = useSelector(({ general }) => general.scope);

	const [filters, setFilters] = useState({
		name         : undefined,
		service_type : undefined,
	});

	const [{ data, loading },
		trigger] = useRequest({
		url    : '/get_shipment_additional_service_codes',
		method : 'GET',
		scope,
	});

	useEffect(() => {
		(async () => {
			if (shipment_id) {
				await trigger({
					params: { filters: { shipment_id } },
				});
			}
		})();
	}, [trigger, shipment_id]);

	let intialList = (data?.list || []).map((item) => ({
		...item,
		shipment_id,
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
export default useList;
