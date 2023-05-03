import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useHandleRepository = (edit) => {
	let api = 'create_service_ops_repository';
	if (edit) {
		api = 'update_service_ops_repository';
	}

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const handleRepository = async (payload, listRepository) => {
		try {
			await trigger({
				data: payload,
			});
			listRepository();
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
