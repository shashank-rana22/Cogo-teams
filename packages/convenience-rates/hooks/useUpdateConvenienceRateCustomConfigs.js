import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

// import saveHelper from '../common/GlobalConfigForm/helpers/saveHelper';
import toastApiError from '../utils/toastApiError';

const useUpdateConvenienceRateCustomConfigs = (
	{ itemValue = {}, onClosingForm = () => {}, defaultConfigFeeUnit, watch = () => {} },
) => {
	const router = useRouter();
	const { convenience_rate_id } = router?.query || {};

	const [, trigger] = useRequest({
		url    : './update_convenience_rate_custom_configuration',
		method : 'POST',
	}, { manual: true });

	const onUpdate = async () => {
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
			onClosingForm();
		} catch (error) {
			toastApiError(error);
		}
	};
	// const onUpdate = saveHelper({ trigger, watch, convenience_rate_id, itemValue, defaultConfigFeeUnit });
	// { trigger, convenience_rate_id, watch, itemValue, defaultConfigFeeUnit });

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
