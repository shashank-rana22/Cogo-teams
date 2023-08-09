import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

function useUpdateInventory({
	id = '',
	formValues = {},
	setShowUpdateStatusModal = () => {},
	listAPI = () => {},
}) {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/inventory',
			method  : 'PUT',
			authKey : 'put_air_coe_warehouse_management_inventory',
		},
	);
	const handleOnClose = () => {
		setShowUpdateStatusModal({});
	};

	const handleUpdate = async () => {
		try {
			await trigger({
				data: {
					id,
					services   : formValues?.services,
					dimensions : formValues?.dimensions,
				},
			});
			Toast.success('Zone changed');
			listAPI();
			handleOnClose();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		handleUpdate,
	};
}

export default useUpdateInventory;
