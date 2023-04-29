import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useCheckConfigurationPublishability = ({
	item = {},
	listRefetch = () => {},
	setShow = () => {},
}) => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/configuration_check_publishability',
		method  : 'POST',
		authkey : 'post_allocation_configuration_check_publishability',
	});

	const onCheckPublish = async () => {
		try {
			const payload = {
				allocation_configuration_id: item.id,
			};

			await trigger({
				data: payload,
			});

			listRefetch();

			setShow(false);

			Toast.success('Checking for Publishability. Please check after some time.');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loadingCheckPublishability: loading,
		onCheckPublish,
	};
};

export default useCheckConfigurationPublishability;
