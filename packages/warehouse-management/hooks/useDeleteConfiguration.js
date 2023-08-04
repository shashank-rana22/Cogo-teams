import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

function useDeleteConfiguration({
	id = '',
	setDeleteZone = () => {},
	listAPI = () => {},
}) {
	const [{ loading }, trigger] = useRequestAir(
		{
			url      : 'air-coe/warehouse-management/configuration',
			method   : 'DELETE',
			auth_key : 'delete_air_coe_warehouse_management_configuration',
		},
	);

	const handleOnClose = () => {
		setDeleteZone(false);
	};

	const handleDelete = async () => {
		try {
			await trigger({
				data: {
					id,
				},
			});
			Toast.success('Zone deleted');
			listAPI();
			handleOnClose();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		handleDelete,
		loading,
	};
}

export default useDeleteConfiguration;
