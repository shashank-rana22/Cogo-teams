import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useUpdateConfiguration({
	id = '',
	listAPI = () => {},
	setEditZone = () => {},
	warehouseLocationId = '',
}) {
	const [{ loading = true }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/configuration',
			method  : 'PUT',
			authKey : 'put_air_coe_warehouse_management_configuration',
		},
	);

	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const onSubmit = async (formValues) => {
		try {
			await trigger({
				data: {
					id,
					commodity           : formValues?.commodity,
					aisles              : formValues?.aisles,
					warehouseLocationId : warehouseLocationId || undefined,
					warehouseManagerId  : userId,
					status              : 'active',
				},
			});
			Toast.success('Updated Successfully');
			listAPI();
			setEditZone({});
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
