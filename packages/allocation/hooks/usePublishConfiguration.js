import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import controls from '../utils/get-configuration-publish-controls';

const usePublishConfiguration = ({
	value = {},
	listRefetch = () => {},
	setShow = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/publish_allocation_configuration',
		method : 'POST',
	});

	const formProps = useForm({
		defaultValues: {
			start_date : null,
			end_date   : null,
		},
	});

	const onPublish = async (values) => {
		try {
			const payload = {
				allocation_configuration_id: value.id,
				...values,
			};

			await trigger({
				data: payload,
			});

			listRefetch();

			Toast.success('Configuration published successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}

		setShow(false);
	};

	return {
		loadingPublish: loading,
		onPublish,
		formProps,
		controls,
	};
};

export default usePublishConfiguration;
