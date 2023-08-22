import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateConfiguration = ({
	formValues = {},
	listAPI = () => {},
	setAddNewZone = () => {},
	warehouseLocationId = '',
}) => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/configuration',
			method  : 'POST',
			authKey : 'post_air_coe_warehouse_management_configuration',
		},
	);

	const { userId } = useSelector(({ profile }) => ({
		userId: profile.id,
	}));

	const handleOnClose = () => {
		setAddNewZone(false);
	};

	const onSubmit = async () => {
		try {
			await trigger({
				data: {
					zoneName           : formValues.zoneName,
					commodityType      : formValues.commodity,
					commodity          : formValues.commodity,
					aisles             : formValues.aisles,
					warehouseLocationId,
					warehouseManagerId : userId,
					status             : 'active',
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
