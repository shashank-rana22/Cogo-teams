import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateCancellationRequest = ({ data = {}, refetch = () => {} }) => {
	const router = useRouter();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : 'update_off_boarding_application',
	}, { manual: true });

	const onRequestCancelApplication = async (status) => {
		try {
			const payload = {
				application_id: data?.off_boarding_application_id,
				status,
			};
			await trigger({
				data: payload,
			});

			refetch();

			if (status === 'cancelled') {
				router.push('/attendance-leave-management');
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		onRequestCancelApplication,
	};
};

export default useUpdateCancellationRequest;
