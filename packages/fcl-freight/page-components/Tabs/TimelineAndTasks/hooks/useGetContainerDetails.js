import { useEffect } from 'react';
import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';

const useGetContainerDetails = ({ services }) => {
	const {
		query: { id, service_id },
		scope,
	} = useSelector(({ general }) => ({
		query: (general || {}).query || {},
		scope: general.scope,
	}));

	const { loading, data, trigger } = useRequest(
		'get',
		false,
		scope,
	)('list_shipment_container_details');

	const getContainerList = async () => {
		await trigger({
			params: {
				filters: {
					shipment_id: id,
					service_id,
				},
				page_limit: 100,
				require_container_group_detail: true,
			},
		});
	};

	const servicesdata = services?.filter(
		(service) => service?.service_type === 'fcl_freight_service',
	);

	useEffect(() => {
		getContainerList();
	}, [servicesdata.length]);

	return {
		loading,
		rate: {},
		data,
	};
};

export default useGetContainerDetails;
