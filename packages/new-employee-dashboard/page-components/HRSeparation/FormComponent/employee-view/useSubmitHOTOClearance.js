/* eslint-disable custom-eslint/uuid-check */		// TODOs
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useSubmitHOTOClearance = ({ setShowModal, refetch }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_application_process_details',
	}, { manual: true });

	const { handleSubmit, control, formState: { errors } } = useForm();

	const onSubmit = async (values = {}) => {
		console.log('values', values);
		try {
			await trigger({
				data: {
					sub_process_detail_id : 'ef32b4d5-746d-45de-86b2-c01d06333632',
					process_name          : 'hoto_clearance',
				},
			});

			refetch();
			setShowModal(true);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, handleSubmit, errors, control, onSubmit };
};

export default useSubmitHOTOClearance;
