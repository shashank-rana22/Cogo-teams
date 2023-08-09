import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useCreateConfiguration = ({
	formValues = {},
	listAPI = () => {},
	setAddNewZone = () => {},
}) => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/configuration',
			method  : 'POST',
			authKey : 'post_air_coe_warehouse_management_configuration',
		},
	);

	const handleOnClose = () => {
		setAddNewZone(false);
	};

	const onSubmit = async () => {
		try {
			await trigger({
				data: {
					zoneName            : formValues.zoneName,
					commodityType       : formValues.commodity,
					commodity           : formValues.commodity,
					aisles              : formValues.aisles,
					warehouseLocationId : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
					warehouseManagerId  : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
					status              : 'active',
				},
			});
			Toast.success('New Zone added');
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
};

export default useCreateConfiguration;
