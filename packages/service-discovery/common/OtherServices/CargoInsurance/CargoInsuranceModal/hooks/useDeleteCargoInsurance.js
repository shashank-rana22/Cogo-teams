import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useDeleteCargoInsurance = ({
	service_details = {},
	checkout_id = '',
	spot_search_id = '',
	refetch = () => {},
	setShow = () => {},
}) => {
	const URL = checkout_id ? '/update_checkout_service' : '/update_spot_search';

	const servicesList = Object.values(service_details || {});

	const [{ loading = false }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const handleDelete = async () => {
		const deleted_services = servicesList.filter(
			(serviceItem) => serviceItem.service_type === 'cargo_insurance',
		);

		const ids = deleted_services.map((ser) => ser.id);

		const params = (ids || []).map((id) => ({ id, status: 'inactive' }));

		try {
			const payload = {
				id                                  : checkout_id || spot_search_id,
				service                             : 'cargo_insurance',
				cargo_insurance_services_attributes : params,
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
			return false;
		}
	};

	return {
		loading,
		handleDelete,
	};
};

export default useDeleteCargoInsurance;
