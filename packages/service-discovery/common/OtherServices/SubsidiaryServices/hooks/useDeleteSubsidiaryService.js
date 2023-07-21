import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useDeleteSubsidiaryService = ({
	data = {},
	service_details,
	checkout_id = '',
	refetch = () => {},
	setShow = () => {},
}) => {
	const URL = checkout_id ? '/update_checkout_service' : '/update_spot_search';

	const { service_details: serviceDetails = {} } = data || [];

	const servicesList = Object.values(service_details || serviceDetails || {});

	const [{ loading = false }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const handleDeleteService = async (service_code) => {
		const deleted_services = servicesList.filter(
			(serviceItem) => serviceItem.code === service_code,
		);

		const ids = deleted_services.map((ser) => ser.id);

		const params = (ids || []).map((id) => ({ id, status: 'inactive' }));

		try {
			const payload = {
				id                             : data?.checkout_id ? data?.checkout_id : data?.spot_search_id,
				service                        : 'subsidiary',
				subsidiary_services_attributes : params,
			};

			await trigger({ data: payload });

			Toast.success('Service deleted successfully!');
			setShow(false);
			refetch();
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
