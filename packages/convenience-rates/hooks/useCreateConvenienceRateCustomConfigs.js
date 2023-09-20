import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayloadCustomConfigs from
	'../page-components/ConvenienceRateDetail/CustomConfig/CustomConfigForm/getPayloadCustomConfgis';
import toastApiError from '../utils/toastApiError';

const useCreateConvenienceRateCustomConfigs = (
	{ defaultConfigFeeUnit },
) => {
	const router = useRouter();
	const { convenience_rate_id } = router?.query || {};
	const [{ loading }, trigger] = useRequest({
		url    : './create_convenience_rate_custom_configuration',
		method : 'POST',
	}, { manual: true });

	const onSave = async ({ values }) => {
		try {
			const payload = getPayloadCustomConfigs({ values, convenience_rate_id, defaultConfigFeeUnit });
			await trigger({
				data: payload,
			});

			Toast.success('Custom rate created sucessfully');
		} catch (error) {
			toastApiError(error);
		}
	};

	return { onSave, loading };
};
export default useCreateConvenienceRateCustomConfigs;
