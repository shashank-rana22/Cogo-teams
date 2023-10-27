import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayload from '../helpers/getPayload';

function useCreateHandlingFeeConfig({
	activeService = '',
	data = {},
	type = 'create',
}) {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : './create_handling_fee_configuration',
		method : 'POST',
	}, { manual: true });

	const [{ loading: loadingUpdation }, triggerUpdate] = useRequest({
		url    : './update_handling_fee_configuration',
		method : 'POST',
	}, { manual: true });

	const onCreate = async (values) => {
		try {
			const payload = getPayload({
				values,
				activeService,
				isUpdatable     : type === 'edit',
				handling_fee_id : data?.data?.id || undefined,
			});

			if (type === 'edit') {
				await triggerUpdate({
					data: payload,
				});
			} else {
				await trigger({
					data: payload,
				});
			}

			Toast.success('Convenience rate created sucessfully');

			router.push('/handling-fees');
		} catch (error) {
			if (error?.response) {
				Toast.error(error.response?.data);
			}
		}
	};

	return {
		loading,
		onCreate,
		loadingUpdation,
		triggerUpdate,
	};
}

export default useCreateHandlingFeeConfig;
