import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayload from '../common/GlobalConfigForm/helpers/getPayload';
import toastApiError from '../utils/toastApiError';

const useCreateConvenienceRateConfigs = (
	{ onClosingForm = () => {}, activeService = '' },
) => {
	const router = useRouter();
	const { convenience_rate_id = '' } = router?.query || {};
	const [{ loading }, trigger] = useRequest({
		url    : './create_convenience_rate_configuration',
		method : 'POST',
	}, { manual: true });
	// const newObj = saveHelper(values.slab_details);
	// const newObj = ;
	const onCreate = async (values) => {
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
				const payload = getPayload(
					{ values, activeService, convenience_rate_id },
				);
				await trigger({
					data: payload,
				});

				Toast.success('Convenience rate created sucessfully');

				onClosingForm();
			} catch (error) {
				toastApiError(error);
			}
		}
	};

	return { onCreate, loading };
};
export default useCreateConvenienceRateConfigs;
