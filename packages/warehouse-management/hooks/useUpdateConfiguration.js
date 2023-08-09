import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

function useUpdateConfiguration({
	formValues = {},
	listAPI = () => {},
	setEditZone = () => {},
}) {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/configuration',
			method  : 'PUT',
			authKey : 'put_air_coe_warehouse_management_configuration',
		},
	);

	const handleOnClose = () => {
		setEditZone(false);
	};

	const onSubmit = async () => {
		try {
			await trigger({
				data: {
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
		onSubmit,
		loading,
	};
}

export default useUpdateConfiguration;
