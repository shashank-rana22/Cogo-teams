import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateConvenienceRateConfigs = (
	{
		data = {},
		onClosingForm = () => {}, isUpdatable = '', showAlternateCFConfig = '', values = {}, activeService = '',
	},
) => {
	const router = useRouter();
	const { convenience_rate_id } = router?.query || {};
	// console.log(router?.query);
	const [, trigger] = useRequest({
		url    : './update_convenience_rate_configuration',
		method : 'POST',
	}, { manual: true });

	// const onUpdate = () => {
	// 	try {
	// 		Toast.success('Updated successfully');
	// 	} catch (error) {
	// 		toastApiError(error);
	// 	}
	// };
	// console.log(values);
	const onUpdate = async () => {
		const IS_VALID = true;
		// const IS_VALID =	validateSlabs({
		// 	currSlab: values.slab_details,
		// })
		// 	&& validateFees({
		// 		currSlab: values.slab_details,
		// 	})
		// 	&& validateSlabs({
		// 		currSlab: values.alternate_slab_details,
		// 	})
		// 	&& validateFees({
		// 		currSlab: values.alternate_slab_details,
		// 	});

		if (IS_VALID) {
			try {
				let containerSlabs = values?.slab_details.map((container_slab) => ({
					fee_currency      : container_slab?.fee_currency || undefined,
					fee_unit          : container_slab.fee_unit || undefined,
					fee_value         : container_slab.fee_value || undefined,
					slab_lower_limit  : container_slab.slab_lower_limit || undefined,
					maximum_fee_value : container_slab.maximum_fee_value || undefined,
					minimum_fee_value : container_slab.minimum_fee_value || undefined,
					slab_unit         : container_slab.slab_unit || undefined,
					slab_upper_limit  : container_slab.slab_upper_limit || undefined,
					is_default        : true,
				}));

				const alternateContainerSlabs = values?.alternate_slab_details.map(
					(container_slab) => ({
						fee_currency      : container_slab?.fee_currency || undefined,
						fee_unit          : container_slab.fee_unit || undefined,
						fee_value         : container_slab.fee_value || undefined,
						slab_lower_limit  : container_slab.slab_lower_limit || undefined,
						maximum_fee_value : container_slab.maximum_fee_value || undefined,
						minimum_fee_value : container_slab.minimum_fee_value || undefined,
						slab_unit         : container_slab.slab_unit || undefined,
						slab_upper_limit  : container_slab.slab_upper_limit || undefined,
						is_default        : false,
					}),
				);

				if (showAlternateCFConfig) {
					containerSlabs = [...containerSlabs, ...alternateContainerSlabs];
				}

				const payload = {
					slab_details : containerSlabs,
					...(!isUpdatable ? { status: 'active' } : {}),
					commodity    : values?.commodity || undefined,
					...(isUpdatable
						? { id: convenience_rate_id, fee_unit: values?.fee_unit }
						: {
							service_type      : activeService,
							fee_unit          : values?.fee_unit,
							booking_source    : values?.booking_source || undefined,
							cogo_entity_id    : values?.cogo_entity_id || undefined,
							organization_type : values?.organization_type || undefined,
							organization_sub_type:
									values?.organization_sub_type || undefined,
							performed_by : values?.performed_by || undefined,
							rate_source  : values?.rate_source || undefined,
						}),
				};

				await trigger({
					data: payload,
				});

				Toast.success(
					'Convenience rate updated sucessfully',
					{
						autoClose: 4000,
					},
				);

				onClosingForm();
			} catch (error) {
				toastApiError(error);
			}
		}
	};

	const onClickDeactivate = async () => {
		try {
			await trigger({
				data: {
					id     : data?.id,
					status : data?.status === 'active' ? 'inactive' : 'active',
				},
			});
			Toast.success(
				`Convenience fee configuration ${
					data?.status === 'active' ? 'deactivated' : 'activated'
				} successfully`,
			);
			router.push(
				'/convenience-rates',
				'/convenience-rates',
			);
		} catch (error) {
			toastApiError(error);
		}
	};

	return { onClickDeactivate, onUpdate };
};
export default useUpdateConvenienceRateConfigs;
