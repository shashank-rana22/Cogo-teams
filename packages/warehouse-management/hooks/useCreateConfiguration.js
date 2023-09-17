import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateConfiguration = ({
	listAPI = () => {},
	setAddNewZone = () => {},
	warehouseLocationId = '',
}) => {
	const [{ loading = true }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/configuration',
			method  : 'POST',
			authKey : 'post_air_coe_warehouse_management_configuration',
		},
	);

	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const onSubmit = async (formValues) => {
		const { zoneName = '', commodity = '', aisles = '' } = formValues;

		try {
			await trigger({
				data: {
					zoneName,
					commodityType       : commodity,
					commodity,
					aisles,
					warehouseLocationId : warehouseLocationId || undefined,
					warehouseManagerId  : userId,
					status              : 'active',
				},
			});
			Toast.success('New Zone added');
			listAPI();
			setAddNewZone(false);
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
