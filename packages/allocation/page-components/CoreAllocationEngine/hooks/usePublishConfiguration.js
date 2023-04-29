import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import controls from '../configurations/get-configuration-publish-controls';

const usePublishConfiguration = ({
	item = {},
	listRefetch = () => {},
	setShow = () => {},
}) => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/configuration_status',
		method  : 'POST',
		authkey : 'post_allocation_configuration_status',
	});

	const formProps = useForm({
		defaultValues: {
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
				allocation_configuration_id : item.id,
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
