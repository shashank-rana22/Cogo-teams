import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCheckConfigurationPublishability = ({
	value = {},
	listRefetch = () => {},
	setShow = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/check_allocation_configuration_publishability',
		method : 'POST',
	});

	const onCheckPublish = async () => {
		try {
			const payload = {
				allocation_configuration_id: value.id,
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
