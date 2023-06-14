import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateTribe = () => {
	const [showAddTribeModal, setShowAddTribeModal] = useState(false);

	const { control, formState: { errors }, handleSubmit } = useForm();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/create_tribe',
	}, { manual: true });

	const onClickSubmitButton = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			setShowAddTribeModal(false);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		showAddTribeModal,
		setShowAddTribeModal,
		control,
		errors,
		handleSubmit,
		onClickSubmitButton,
		loading,
	};
};

export default useCreateTribe;
