import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const useAddSubsidiaryService = ({
	possible_subsidiary_services = [],
	refetch = () => [],
	data = {},
	checkout_id = '',
}) => {
	const URL = data?.checkout_id || checkout_id ? '/create_checkout_service' : '/create_spot_search_service';

	const [{ loading = false }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const { service_details } = data || {};

	const servicesList = Object.values(service_details || {});

	const handleAddSubsidiaryService = async (subsidiaryService) => {
		const serviceObj = (possible_subsidiary_services || []).filter(
			(item) => item.key === subsidiaryService,
		)?.[GLOBAL_CONSTANTS.zeroth_index];

		const services_Arr = (servicesList || []).filter(
			(item) => item?.service_type === serviceObj?.service
				&& (item?.trade_type === serviceObj?.trade_type
					|| !item?.trade_type
					|| !serviceObj?.trade_type),
		);

		const subsidiaryServicesArr = [];
		(services_Arr || []).forEach((item) => {
			const service = {
				code         : serviceObj?.code,
				service_type : serviceObj?.service,
				service_id   : item?.id,
				status       : 'active',
			};
			subsidiaryServicesArr.push(service);
		});

		try {
			let payload = {};
			if (!data?.checkout_id || checkout_id) {
				payload = {
					id                  : data?.spot_search_id,
					service             : 'subsidiary',
					subsidiary_services : subsidiaryServicesArr,
				};
			} else {
				payload = {
					id                             : data?.checkout_id,
					service                        : 'subsidiary',
					subsidiary_services_attributes : subsidiaryServicesArr,
				};
			}

			await trigger({ data: payload });

			Toast.success('Service added successfully!');
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
		handleAddSubsidiaryService,
		loading,
	};
};

export default useAddSubsidiaryService;
