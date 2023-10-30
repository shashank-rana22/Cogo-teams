import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayloadCustomConfigs from '../helpers/getPayloadCustomConfgis';

function useUpdateHandlingFeeCustomConfig({
	itemValue = {},
	onClosingForm = () => { },
	defaultConfigFeeUnit,
	activeList = 'active',
	refetchGetHandlingFeeData = () => { },
}) {
	const router = useRouter();

	const { id } = router?.query || {};

	const [, trigger] = useRequest({
		url    : '/update_handling_fee_custom_configuration',
		method : 'POST',
	}, { manual: true });

	const onUpdate = async (values) => {
		try {
			const payload = getPayloadCustomConfigs({
				values, handling_fee_id: id, defaultConfigFeeUnit, activeList, item_id: itemValue?.id,
			});

			await trigger({
				data: payload,
			});

			Toast.success('Custom rate updated sucessfully');

			onClosingForm();

			refetchGetHandlingFeeData();
		} catch (error) {
			if (error?.response) {
				Toast.error(error?.response?.data);
			}
		}
	};

	const onClickDeactivate = async () => {
		try {
			const deleted_organization_ids = (itemValue?.organization_ids || []).filter(
				(orgId) => !(itemValue?.organization_ids || []).includes(orgId),
			);
			await trigger({
				data: {
					id                                : itemValue?.id,
					convenience_rate_configuration_id : id,
					organization_ids                  : itemValue?.organization_ids,
					deleted_organization_ids,
					...(itemValue?.status === 'inactive'
						? { slab_details: itemValue?.slab_details }
						: {}),
					status: itemValue?.status === 'active' ? 'inactive' : 'active',
				},
			});
			Toast.success(
				`Handling fee configuration ${
					itemValue?.status === 'active' ? 'deactivated' : 'activated'
				} successfully`,
			);
			onClosingForm();
			refetchGetHandlingFeeData();
		} catch (error) {
			if (error?.response) {
				Toast.error(error?.response?.data);
			}
		}
	};

	return {
		onClickDeactivate,
		onUpdate,
	};
}

export default useUpdateHandlingFeeCustomConfig;
