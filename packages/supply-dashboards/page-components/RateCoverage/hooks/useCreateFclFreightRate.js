import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateFclFreightRate = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_fcl_freight_rate',
		method : 'POST',
	}, { manual: true });

	const fclFreightRate = async ({ dataa }) => {
		try {
			await trigger({
				data: {
					origin_port_id      : dataa?.origin_location_id,
					destination_port_id : dataa?.destination_location_id,
					container_size      : dataa?.container_size,
					container_type      : dataa?.container_type,
					commodity           : dataa?.commodity,
					validity_start      : dataa?.validity_start,
					validity_end        : dataa?.validity_end,
					service_provider_id : dataa?.service_provider_id,
					shipping_line_id    : dataa?.shipping_line_id,
					sourced_by_id       : dataa?.sourced_by_id,
				},
			});
		} catch (err) {
			// console.log(err);
			Toast.error('failed to cancel');
		}
	};

	return {
		loading,
		fclFreightRate,
	};
};

export default useCreateFclFreightRate;
