/* eslint-disable custom-eslint/uuid-check */		// TODOs
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useHotoClearance = ({ refetch, data = {} }) => {
	const [showModal, setShowModal] = useState(false);

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_application_process_details',
	}, { manual: true });

	const { handleSubmit, control, formState: { errors } } = useForm();

	const onSubmit = async (values = {}) => {
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

	const { applicant_details } = data || {};

	return {
		loading,
		handleSubmit,
		errors,
		control,
		onSubmit,
		applicant_details,
		showModal,
		setShowModal,
	};
};

export default useHotoClearance;
