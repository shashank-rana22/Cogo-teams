import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeleteAdditionalService = ({ service, source = '', refetch = () => {} }) => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { spot_search_id = '', checkout_id = '' } = query;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : checkout_id ? 'update_checkout_service' : 'remove_spot_search_service',
	}, { manual: true });

	const handleRemoveService = async () => {
		let serviceName = service.service_type;

		const services = [];

		service.data?.forEach((serviceItem) => {
			const serviceObj = {
				status : 'inactive',
				id     : serviceItem.id,
			};

			if (
				serviceName === 'transportation'
				&& ['ftl_freight', 'ltl_freight', 'trailer_freight'].includes(
					serviceItem.service_type,
				)
			) {
				serviceName = serviceItem.service_type;
			}

			services.push(serviceObj);
		});

		let apiServiceName = serviceName;

		if (serviceName === 'trailer_freight' && source === 'checkout') {
			apiServiceName = 'haulage_freight';
		}

		const params = {
			id                                        : checkout_id || undefined,
			spot_search_id                            : !checkout_id ? spot_search_id : undefined,
			service                                   : apiServiceName,
			[`${apiServiceName}_services_attributes`] : services,
		};

		try {
			await trigger({ data: params });
			Toast.success('Service deleted successfully!');
			refetch();
			return true;
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
			return false;
		}
	};

	return {
		loading,
		handleRemoveService,
	};
};

export default useDeleteAdditionalService;
