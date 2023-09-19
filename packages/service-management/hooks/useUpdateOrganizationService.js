import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateOrganizationService = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_organization_service',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async ({ service_type = '', org_id = '', data = {}, service_data = {} }) => {
		const location_pairs = Object.keys(
			service_data?.service_data?.location_pairs || [],
		)?.map((val) => {
			const key = service_data?.service_data?.location_pairs?.[val];
			if (key?.location_id) {
				return {
					location_id : key?.location_id,
					trade_type  : key?.trade_type,
					total_teus  : key?.total_teus,
					user_id     : key?.user_id,
				};
			}
			return {
				origin_location_id      : key?.origin_location_id,
				destination_location_id : key?.destination_location_id,
				total_teus              : key?.total_teus,
				user_id                 : key?.user_id,
			};
		});
		try {
			await trigger({
				data: {
					service_data: {
						location_pairs: [...location_pairs],
						...data?.requested_service?.service_data,
					},
					organization_id       : org_id,
					service               : service_type,
					delete_rest_expertise : false,
				},
			});
			Toast.success('service updated successfully');
		} catch (error) {
			toastApiError(error);
		}
	};
	return { loading, onSubmit };
};
export default useUpdateOrganizationService;
