import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useHandleRepository = (edit) => {
	const api = edit ? '/update_shipment_service_ops_repository' : '/create_shipment_service_ops_repository';

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const handleRepository = async (payload, listRepository, setShowModal) => {
		try {
			await trigger({
				data: payload,
			});
			listRepository();
			setShowModal(false);
			Toast.success(`Repository ${edit ? 'Updated' : 'Created'} Successfully`);
		} catch (err) {
			Toast.error(err?.response?.data?.base || err?.message || 'Failed to Upload');
		}
	};

	return {
		handleRepository,
		loading,
	};
};
export default useHandleRepository;
