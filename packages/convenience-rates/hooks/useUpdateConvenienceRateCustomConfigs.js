import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayloadCustomConfigs from
	'../page-components/ConvenienceRateDetail/CustomConfig/CustomConfigForm/getPayloadCustomConfgis';
import toastApiError from '../utils/toastApiError';

const useUpdateConvenienceRateCustomConfigs = ({
	itemValue = {}, onClosingForm = () => {}, defaultConfigFeeUnit, activeList = 'active',
}) => {
	// console.log(itemValue);
	const router = useRouter();
	const { convenience_rate_id } = router?.query || {};
	const [, trigger] = useRequest({
		url    : './update_convenience_rate_custom_configuration',
		method : 'POST',
	}, { manual: true });

	const onUpdate = async ({ values }) => {
		try {
			const payload = getPayloadCustomConfigs(
				{ values, convenience_rate_id, defaultConfigFeeUnit, activeList, item_id: itemValue?.id },
			);
			await trigger({
				data: payload,
			});

			Toast.success('Custom rate updated sucessfully');
		} catch (error) {
			toastApiError(error);
		}
	};

	const onClickDeactivate = async () => {
		try {
			const deleted_organization_ids = (itemValue?.organization_ids || []).filter(
				(id) => !(itemValue?.organization_ids || []).includes(id),
			);
			await trigger({
				data: {
					id                                : itemValue?.id,
					convenience_rate_configuration_id : convenience_rate_id,
					organization_ids                  : itemValue?.organization_ids,
					deleted_organization_ids,
					...(itemValue?.status === 'inactive'
						? { slab_details: itemValue?.slab_details }
						: {}),
					status: itemValue?.status === 'active' ? 'inactive' : 'active',
				},
			});
			Toast.success(
				`Convenience fee configuration ${
					itemValue?.status === 'active' ? 'deactivated' : 'activated'
				} successfully`,
			);
			onClosingForm();
		} catch (error) {
			toastApiError(error);
		}
	};

	return { onClickDeactivate, onUpdate };
};
export default useUpdateConvenienceRateCustomConfigs;
