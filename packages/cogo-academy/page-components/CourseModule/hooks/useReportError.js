import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { request } from '@cogoport/request';

const useReportError = ({ setShowErrorModal = () => {} }) => {
	const { handleSubmit, control, formState: { errors } } = useForm();

	const onSubmit = async (values) => {
		const { description, error_screenshot_url = {} } = values || {};

		const { finalUrl = '' } = error_screenshot_url || {};

		const { cogo_course_notification_ids } = GLOBAL_CONSTANTS.uuid;

		const promises = cogo_course_notification_ids.reduce((acc, id) => {
			const payload = {
				type          : 'platform_notification',
				service       : 'user',
				template_name : 'api_error_request_response',
				provider_name : 'cogoport',
				user_id       : id,
				service_id    : id,
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

			const promise = request({
				method : 'POST',
				url    : '/create_communication',
				data   : payload,
			});

			acc.push(promise);

			return acc;
		}, []);

		try {
			await Promise.all(promises);

			Toast.success(
				'Issue has been noted',
			);

			setShowErrorModal(false);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		handleSubmit,
		control,
		errors,
		onSubmit,
	};
};

export default useReportError;
