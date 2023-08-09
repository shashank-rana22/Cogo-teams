import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

function useUpdateInventory({
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
					zoneName            : formValues.zoneName,
					commodityType       : formValues.commodityType,
					commodity           : formValues.commodityType,
					aisles              : formValues.aisles,
					warehouseLocationId : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
					warehouseManagerId  : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
					status              : 'active',
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
