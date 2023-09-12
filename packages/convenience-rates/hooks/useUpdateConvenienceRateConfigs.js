import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayload from '../common/GlobalConfigForm/helpers/getPayload';
import toastApiError from '../utils/toastApiError';

const useUpdateConvenienceRateConfigs = (
	{
		data = {}, isUpdatable = '', activeService = '',
	},
) => {
	const router = useRouter();
	const { convenience_rate_id = '' } = router?.query || {};

	const [{ loading }, trigger] = useRequest({
		url    : './update_convenience_rate_configuration',
		method : 'POST',
	}, { manual: true });

	const onSave = async (values) => {
		// console.log(values);
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
		// console.log(payload);
		if (IS_VALID) {
			try {
				const payload = getPayload(
					{ values, isUpdatable, activeService, convenience_rate_id },
				);
				await trigger({
					data: payload,
				});

				Toast.success('Convenience rate updated sucessfully');
				router.push(
					'/convenience-rates',
					'/convenience-rates',
				);
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
		} catch (error) {
			toastApiError(error);
		}
	};

	return { onClickDeactivate, onSave, loading };
};
export default useUpdateConvenienceRateConfigs;
