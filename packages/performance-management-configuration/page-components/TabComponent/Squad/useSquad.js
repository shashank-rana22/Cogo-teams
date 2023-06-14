import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

import getColumns from './getColumns';

const useSquad = () => {
	const [search, setSearch] = useState('');
	const [showAddSquadModal, setShowAddSquadModal] = useState(false);

	const { control, formState: { errors }, handleSubmit } = useForm();

	const columns = getColumns();

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
			setShowAddSquadModal(false);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		columns,
		search,
		setSearch,
		showAddSquadModal,
		setShowAddSquadModal,
		control,
		errors,
		onClickSubmitButton,
		loading,
		handleSubmit,
	};
};

export default useSquad;
