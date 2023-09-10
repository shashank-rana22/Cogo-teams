import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../utils/toastApiError';
// import saveHelper from '../common/GlobalConfigForm/helpers/saveHelper';

const useCreateConvenienceRateCustomConfigs = (
	{ itemValue = {}, defaultConfigFeeUnit, watch = () => {} },
) => {
	const router = useRouter();
	const { convenience_rate_id } = router?.query || {};
	const [, trigger] = useRequest({
		url    : './create_convenience_rate_custom_configuration',
		method : 'POST',
	}, { manual: true });

	const onCreate = async () => {
		try {
			const { organization_ids = [], custom_config_slab = [] } = watch();

			const deleted_organization_ids = (itemValue?.organization_ids || []).filter(
				(id) => !(itemValue?.organization_ids || []).includes(id),
			);

			const containerSlabs = custom_config_slab.map((container_slab) => ({
				fee_currency      : container_slab?.fee_currency || undefined,
				fee_unit          : container_slab.fee_unit || undefined,
				fee_value         : container_slab.fee_value || undefined,
				slab_lower_limit  : container_slab.slab_lower_limit || undefined,
				maximum_fee_value : container_slab.maximum_fee_value || undefined,
				minimum_fee_value : container_slab.minimum_fee_value || undefined,
				slab_unit         : container_slab.slab_unit || undefined,
				slab_upper_limit  : container_slab.slab_upper_limit || undefined,
				is_default        : container_slab.fee_unit === defaultConfigFeeUnit,
			}));

			const payload = {
				deleted_organization_ids,
				slab_details                      : containerSlabs,
				status                            : 'active',
				id                                : itemValue?.id,
				...(!isEmpty(organization_ids) ? { organization_ids } : {}),
				convenience_rate_configuration_id : convenience_rate_id,
			};

			await trigger({
				data: payload,
			});

			Toast.success(
				'Custom rate updated sucessfully',
				{
					autoClose: 3000,
				},
			);
		} catch (error) {
			toastApiError(error);
		}
	};
	// saveHelper({ trigger, convenience_rate_id, watch, itemValue, defaultConfigFeeUnit });

	return { onCreate };
};
export default useCreateConvenienceRateCustomConfigs;
