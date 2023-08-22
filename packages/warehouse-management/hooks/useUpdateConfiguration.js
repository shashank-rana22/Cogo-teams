import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useUpdateConfiguration({
	id = '',
	formValues = {},
	listAPI = () => {},
	setEditZone = () => {},
	warehouseLocationId = '',
}) {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/configuration',
			method  : 'PUT',
			authKey : 'put_air_coe_warehouse_management_configuration',
		},
	);

	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const handleOnClose = () => {
		setEditZone(false);
	};

	const onSubmit = async () => {
		try {
			await trigger({
				data: {
					id,
					commodity          : formValues?.commodity,
					aisles             : formValues?.aisles,
					warehouseLocationId,
					warehouseManagerId : userId,
					status             : 'active',
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
