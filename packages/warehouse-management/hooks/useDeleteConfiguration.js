import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

function useDeleteConfiguration({
	id = '',
	setDeleteZone = () => {},
	listAPI = () => {},
}) {
	const [{ loading = true }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/configuration',
			method  : 'DELETE',
			authKey : 'delete_air_coe_warehouse_management_configuration',
		},
	);

	const handleDelete = async () => {
		try {
			await trigger({
				params: {
					id,
				},
			});
			Toast.success('Zone deleted');
			listAPI();
			setDeleteZone({});
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
