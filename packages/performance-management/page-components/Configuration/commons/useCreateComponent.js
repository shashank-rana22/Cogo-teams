import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const useCreateComponent = ({ fetchList, setShowCreateModal, source = 'tribe' }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : `/create_${source}`,
	}, { manual: true });

	const onClickSubmitButton = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});

			Toast.success(`${source} has been created successfully`);
			setShowCreateModal(false);
			fetchList();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		onClickSubmitButton,
		loading,
	};
};

export default useCreateComponent;
