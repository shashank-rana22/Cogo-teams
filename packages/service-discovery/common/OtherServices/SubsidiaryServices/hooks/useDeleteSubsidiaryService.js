import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useDeleteSubsidiaryService = ({
	data = {},
	service_details,
	checkout_id = '',
	spot_search_id = '',
	refetch = () => {},
	setShow = () => {},
}) => {
	const url = checkout_id ? '/update_checkout_service' : '/remove_spot_search_service';
	const idKey = checkout_id ? 'id' : 'spot_search_id';

	const { service_details: serviceDetails = {} } = data || [];

	const servicesList = Object.values(service_details || serviceDetails || {});

	const [{ loading = false }, trigger] = useRequest({
		url,
		method: 'POST',
	}, { manual: true });

	const handleDeleteService = async (service_code) => {
		const deleted_services = servicesList.filter(
			(serviceItem) => serviceItem.code === service_code,
		);

		const ids = deleted_services.map((ser) => ser.id);

		const params = (ids || []).map((id) => ({ id, status: 'inactive' }));

		try {
			const payload = {
				[idKey]                        : spot_search_id || checkout_id,
				service                        : 'subsidiary',
				subsidiary_services_attributes : params,
			};

			await trigger({ data: payload });

			Toast.success('Service deleted successfully!');
			setShow(false);
			await refetch();
			return true;
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
			setShow(false);
			return false;
		}
	};

	return {
		loading,
		handleDeleteService,
	};
};

export default useDeleteSubsidiaryService;
