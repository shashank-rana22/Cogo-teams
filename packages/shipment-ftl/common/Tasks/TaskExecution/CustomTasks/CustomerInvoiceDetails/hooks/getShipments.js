import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { useSelector } from '@cogo/store';
import { getApiErrorString } from '@cogoport/front/utils';

const getShipments = () => {
	const {
		general: { scope },
	} = useSelector((state) => state);
	const { trigger, data } = useRequest(
		'get',
		false,
		scope,
	)('/list_shipment_services');

	const getShipmentServices = async (shipment_id) => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id,
						status: ['active', 'pending', 'inactive'],
					},
					page_limit: 100,
				},
			});
		} catch (error) {
			toast.error(getApiErrorString(error?.data));
		}
	};
	return {
		getShipmentServices,
		data,
	};
};

export default getShipments;
