import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const getServices = (services) => services.map((service) => ({ serviceName: service, serviceStatus: 'received' }));

function useUpdateInventory({
	id = '',
	setShowUpdateStatusModal = () => {},
	listAPI = () => {},
}) {
	const [{ loading = true }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/inventory',
			method  : 'PUT',
			authKey : 'put_air_coe_warehouse_management_inventory',
		},
	);

	const handleUpdate = async (formValues) => {
		try {
			await trigger({
				data: {
					id,
					services: getServices(formValues?.servicesSelected),
				},
			});
			Toast.success('Updated Successfully');
			listAPI();
			setShowUpdateStatusModal({});
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
