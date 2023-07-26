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
	const url = checkout_id ? '/update_checkout_service' : '/remove_spot_search_service';
	const idKey = checkout_id ? 'id' : 'spot_search_id';
	const key = checkout_id ? 'cargo_insurance_services_attributes' : 'cargo_insurance_services';

	const servicesList = Object.values(service_details || {});

	const [{ loading = false }, trigger] = useRequest({
		url,
		method: 'POST',
	}, { manual: true });

	const handleDelete = async () => {
		const deleted_services = servicesList.filter(
			(serviceItem) => serviceItem.service_type === 'cargo_insurance',
		);

		const ids = deleted_services.map((ser) => ser.id);

		const params = (ids || []).map((id) => ({ id, status: 'inactive' }));

		try {
			const payload = {
				[idKey] : spot_search_id || checkout_id,
				service : 'cargo_insurance',
				[key]   : params,
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
