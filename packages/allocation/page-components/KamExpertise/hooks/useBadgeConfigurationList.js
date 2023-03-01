import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useBadgeConfigurationList() {
	const [{ loading }, trigger] = useRequest({
		url     : '/get_allocation_kam_expertise_badge_configuration_list',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_badge_configuration_list',
	}, { manual: false });
	const fetchBadgeList = async () => {
		try {
			const payload = {
				version_id                           : '1',
				badge_name                           : 'nautical_na',
				description                          : 'description for the 1st badge',
				kam_expertise_event_configuration_id : '00245b2c-m9k8-479e-8dcf-bhnc9kk093870',
				status                               : 'active',
				// performed_by_id                      : '00245b2c-c754-400e-8dcf-bcbc18f33780',
				// performed_by_type                    : 'sales_person',
			};

			// const response = await trigger({ params: { filters: { user_id, partner_id } } });
			const response = await trigger();

			// listRefetch();

			// setShow(false);
			console.log(response);
			Toast.success('Checking for Publishability. Please check after some time.');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loading,
		fetchBadgeList,
	};
}

export default useBadgeConfigurationList;
