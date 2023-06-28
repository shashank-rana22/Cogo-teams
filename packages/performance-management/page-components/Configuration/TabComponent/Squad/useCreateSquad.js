import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreateSquad = ({ fetchList, setShowSquadModal }) => {
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
			Toast.success('Squad has been created successfully');
			setShowSquadModal(false);
			fetchList();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		onClickSubmitButton,
		loading,
	};
};

export default useCreateSquad;
