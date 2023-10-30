import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import getPayload from '../helpers/getPayload';
import { validateSlabs } from '../helpers/validateSlabs';

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

	const [{ loading: updationLoading }, triggerUpdate] = useRequest({
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

			if (validateSlabs({ slabs: payload.slab_details })) {
				if (type === 'edit') {
					await triggerUpdate({
						data: payload,
					});
				} else {
					await trigger({
						data: payload,
					});
				}

				Toast.success(
					`${
						type === 'edit' ? 'Updated' : 'Created'
					} Successfully`,
				);

				router.push('/handling-fees');
			}
		} catch (error) {
			if (error?.response) {
				Toast.error(error.response?.data);
			}
		}
	};

	const onClickUpdateStatus = async () => {
		try {
			await triggerUpdate({
				data: {
					id           : data?.data?.id,
					status       : data?.data?.status === 'active' ? 'inactive' : 'active',
					slab_details : data?.data?.slab_details,
				},
			});

			Toast.success(
				`Handling fee configuration ${
					data?.data?.status === 'active' ? 'deactivated' : 'activated'
				} successfully`,
			);

			router.push(
				`/handling-fees?service=${activeService}`,
				`/handling-fees?service=${activeService}`,
			);
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};

	return {
		loading,
		onCreate,
		updationLoading,
		triggerUpdate,
		onClickUpdateStatus,
	};
}

export default useCreateHandlingFeeConfig;
