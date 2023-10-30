import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateSegment = ({ getSegmentData }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication_segment_control',
		method : 'POST',
	}, { manual: true });

	const createSegment = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			await getSegmentData();
			Toast.success('Rule Added Successfully');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		createSegmentLoading: loading,
		createSegment,
	};
};

export default useCreateSegment;
