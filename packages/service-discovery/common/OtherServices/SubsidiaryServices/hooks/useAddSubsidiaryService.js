import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const useAddSubsidiaryService = ({
	possible_subsidiary_services = [],
	refetch = () => [],
	data = {},
	checkout_id = '',
}) => {
	const URL = checkout_id ? '/create_checkout_service' : '/add_spot_search_service';

	const [{ loading = false }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const { service_details, spot_search_id = '' } = data || {};

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

		const subsidiaryServicesArr = services_Arr.map((item) => ({
			code         : serviceObj?.code,
			service_type : serviceObj?.service,
			service_id   : item?.id,
			status       : 'active',
		}));

		const MAPPING = {
			true: {
				keyToUse    : 'id',
				value       : checkout_id,
				service_key : 'subsidiary_services_attributes',
			},
			false: {
				keyToUse    : 'spot_search_id',
				value       : spot_search_id,
				service_key : 'subsidiary_services_attributes',
			},
		};

		const { keyToUse, value, service_key } = MAPPING[!isEmpty(checkout_id)];

		try {
			const payload = {
				[keyToUse]    : value,
				service       : 'subsidiary',
				[service_key] : subsidiaryServicesArr,
			};

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
