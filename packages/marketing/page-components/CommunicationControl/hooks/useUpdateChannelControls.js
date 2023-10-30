import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateChannelControls = ({ getChannelControls = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_communication_channel_controls',
		method : 'POST',
	}, { manual: true });

	const updateChannelControl = async ({ list = [] }) => {
		try {
			await trigger({
				data: { channel_controls: list },
			});
			getChannelControls();
			Toast.success('Updated Successfully');
		} catch (error) {
			toastApiError(error);
		}
	};
	return {
		updateChannelControl,
		updateChannelLoading: loading,
	};
};
export default useUpdateChannelControls;
