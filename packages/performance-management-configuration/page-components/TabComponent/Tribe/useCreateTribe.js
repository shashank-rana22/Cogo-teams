import { Toast } from '@cogoport/components';
// import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateTribe = ({ fetchList }) => {
	const [showAddTribeModal, setShowAddTribeModal] = useState(false);

	// const { control, formState: { errors }, handleSubmit } = useForm();

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

			Toast.success('Successfully Created');
			setShowAddTribeModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		showAddTribeModal,
		setShowAddTribeModal,
		onClickSubmitButton,
		loading,
	};
};

export default useCreateTribe;
