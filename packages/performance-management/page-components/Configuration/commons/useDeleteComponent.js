import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useDeleteComponent = ({ fetchList, setShowDeleteModal, showDeleteModal, source = 'tribe' }) => {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'DELETE',
			url    : `/delete_${source}`,
		},
		{ manual: true },
	);

	const payloadKey = `${source}_id`;

	const deleteComponent = async () => {
		const payload = {
			[payloadKey]: showDeleteModal,
		};

		try {
			await trigger({
				data: payload,
			});

			Toast.success(`${source} has been deleted successfully`);
			setShowDeleteModal(false);
			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		deleteComponent,
		loading,
	};
};

export default useDeleteComponent;
