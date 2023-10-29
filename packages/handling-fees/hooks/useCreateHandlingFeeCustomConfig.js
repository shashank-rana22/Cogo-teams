import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayloadCustomConfigs from '../helpers/getPayloadCustomConfgis';

function useCreateHandlingFeeCustomConfig({
	defaultConfigFeeUnit = '',
	onClosingForm = () => { },
	refetchGetHandlingFeeData = () => { },
}) {
	const router = useRouter();

	const { id } = router?.query || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_handling_fee_custom_configuration',
		method : 'POST',
	}, { manual: true });

	const onCreate = async (values) => {
		try {
			const payload = getPayloadCustomConfigs({
				values,
				handling_fee_id: id,
				defaultConfigFeeUnit,
			});

			await trigger({
				data: payload,
			});

			Toast.success('Custom rate created sucessfully');

			onClosingForm();

			refetchGetHandlingFeeData();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return { onCreate, loading };
}

export default useCreateHandlingFeeCustomConfig;
