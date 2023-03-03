import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useBadgeConfigurationAttributes() {
	const formProps = useForm();

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/post_allocation_kam_expertise_badge_configuration_detail_attributes',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration_detail_attributes',
	});

	const onCheckPublish = async (payload_data = {}) => {
		try {
			const payload = {
				id        : payload_data.id,
				medal     : payload_data.medal,
				image_url : payload_data.image_url,
				score     : payload_data.score,
				status    : 'active',
			};

			await trigger({
				data: payload,
			});

			// listRefetch();

			// setShow(false);

			Toast.success('Badge Updated!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loading,
		onCheckPublish,
		formProps,
	};
}

export default useBadgeConfigurationAttributes;
