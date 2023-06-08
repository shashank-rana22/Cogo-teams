import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useReportError = ({ setShowErrorModal = () => {} }) => {
	const { handleSubmit, control, formState: { errors } } = useForm();

	const [{ loading : feedbackLoading }, trigger] = useRequest({
		url    : '/create_communication',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async (values) => {
		const { description, error_screenshot_url = {} } = values || {};

		const { finalUrl = '' } = error_screenshot_url || {};

		const payload = {
			user_id       : '20f59087-12cf-4e6d-8463-27d41e23da6f',
			type          : 'platform_notification',
			service       : 'user',
			service_id    : '97dcd57c-d263-496f-9f59-7a7aef400d34',
			template_name : 'api_error_request_response',
			provider_name : 'cogoport',
			variables     : {
				description,
				image_url         : finalUrl,
				status_code       : 1,
				session_data      : '',
				requested_payload : '',
				api_response      : '',
				api_curl          : '',
			},
		};

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Your Report Was Submitted Successfully...');
			setShowErrorModal(false);
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	};

	const reportError = async () => {
		try {
			const payload = {
				user_id       : '20f59087-12cf-4e6d-8463-27d41e23da6f',
				type          : 'platform_notification',
				service       : 'user',
				service_id    : '97dcd57c-d263-496f-9f59-7a7aef400d34',
				template_name : 'api_error_request_response',
				provider_name : 'cogoport',
				variables     : {
					session_data      : '',
					requested_payload : '',
					api_response      : '',
					status_code       : '',
				},
			};
			await trigger({ data: payload });

			Toast.success(
				'Error has been noted',
			);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		handleSubmit,
		control,
		feedbackLoading,
		errors,
		onSubmit,
		reportError,
	};
};

export default useReportError;
