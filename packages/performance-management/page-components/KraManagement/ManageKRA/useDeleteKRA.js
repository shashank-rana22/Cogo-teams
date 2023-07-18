import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useDeleteKRA = ({ fetchListKRA }) => {
	const [showPopOver, setShowPopOver] = useState(null);

	const [{ loading }, trigger] = useHarbourRequest(
		{
			url    : '/delete_kra',
			method : 'delete',
		},
		{ manual: true },
	);

	const onClickDeleteKRA = async (id) => {
		try {
			await trigger({
				data: {
					kra_id: id,
				},
			});

			setShowPopOver(null);
			fetchListKRA();
			Toast.success('KRA deleted successfully');
		} catch (err) {
			if (err.response?.data) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return {
		onClickDeleteKRA,
		loading,
		showPopOver,
		setShowPopOver,
	};
};

export default useDeleteKRA;
