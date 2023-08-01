import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useRemoveDetentionDumurrage = ({
	service_details = {},
	spot_search_id = '',
	refetch = () => {},
	setShow = () => {},
	services = [],
}) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const servicesList = Object.values(service_details || {});

	const [{ loading = false }, trigger] = useRequest({
		method : 'POST',
		url    : '/remove_spot_search_service',
	}, { manual: true });

	const handleDeleteService = async () => {
		const deleted_services = servicesList.filter(
			(serviceItem) => services.includes(serviceItem.code),
		);

		const ids = deleted_services.map((ser) => ser.id);

		const params = (ids || []).map((id) => ({ id, status: 'inactive' }));

		try {
			const payload = {
				spot_search_id                 : query.spot_search_id || spot_search_id,
				service                        : 'subsidiary',
				subsidiary_services_attributes : params,
			};

			await trigger({ data: payload });

			Toast.success('Services deleted successfully!');
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

export default useRemoveDetentionDumurrage;
