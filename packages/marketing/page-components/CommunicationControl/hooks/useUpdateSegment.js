import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateSegment = ({ getSegmentData }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_communication_segment_control',
		method : 'POST',
	}, { manual: true });

	const updateSegment = async (payload = {}, isEdit = false) => {
		try {
			await trigger({
				data: payload,
			});

			getSegmentData();
			if (!isEdit) {
				Toast.success('Successfully deactivated');
			}
			Toast.success('Successfully updated');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateLoading: loading,
		updateSegment,
	};
};

export default useUpdateSegment;
