import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateSquad = ({ fetchList }) => {
	const [showAddSquadModal, setShowAddSquadModal] = useState(false);

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/create_squad',
	}, { manual: true });

	const onClickSubmitButton = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			Toast.success('Successfully Created');
			setShowAddSquadModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		showAddSquadModal,
		setShowAddSquadModal,
		onClickSubmitButton,
		loading,
	};
};

export default useCreateSquad;
