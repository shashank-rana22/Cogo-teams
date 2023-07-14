import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useControlBookingApproval = ({ importer_exporter, checkout_approvals, importer_exporter_id }) => {
	const { push } = useRouter();

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/send_checkout_for_approval',
	}, { manual: true });

	const controlBookingApproval = async () => {
		try {
			const payload = {
				id                           : checkout_approvals?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
				booking_status               : 'pending_approval',
				booking_confirmation_through : 'booking_proof',
			};

			await trigger({
				data: payload,
			});

			Toast.success('Sent for Approval');

			if (importer_exporter.tags.includes('partner')) {
				push('/prm/[id]', `/prm/${importer_exporter_id}`);
			} else {
				push('/details/demand/[id]', `/details/demand/${importer_exporter_id}`);
			}
		} catch (error) {
			if (error.response) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		controlBookingApproval,
		loading,
	};
};

export default useControlBookingApproval;
