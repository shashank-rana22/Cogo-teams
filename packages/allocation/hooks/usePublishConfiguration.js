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
			// start_date : null,
			// end_date   : null,
			active_date_range: null,
		},
	});

	const { setError } = formProps;

	const onPublish = async (values) => {
		if (!values.active_date_range.startDate) {
			setError('active_date_range', { type: 'required', message: 'Start Date is required' });
			return;
		}

		if (!values.active_date_range.endDate) {
			setError('active_date_range', { type: 'required', message: 'End Date is required' });
			return;
		}

		try {
			const payload = {
				allocation_configuration_id : value.id,
				// ...values,
				start_date                  : values.active_date_range?.startDate,
				end_date                    : values.active_date_range?.endDate,
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
