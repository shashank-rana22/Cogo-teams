import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayloadCustomConfigs from '../helpers/getPayloadCustomConfgis';
import { validateSlabs } from '../helpers/validateSlabs';

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

			if (validateSlabs({ slabs: payload.slab_details })) {
				await trigger({
					data: payload,
				});

				Toast.success('Custom rate updated sucessfully');

				onClosingForm();

				refetchGetHandlingFeeData();
			}
		} catch (error) {
			if (error?.response) {
				Toast.error(error?.response?.data);
			}
		}
	};

	const onClickDeactivate = async () => {
		try {
			await trigger({
				data: {
					id               : itemValue?.id,
					organization_ids : itemValue?.organization_ids,
					slab_details     : itemValue?.slab_details,
					status           : itemValue?.status === 'active' ? 'inactive' : 'active',
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
