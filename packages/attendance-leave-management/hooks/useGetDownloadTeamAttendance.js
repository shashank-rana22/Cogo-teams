import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetDownloadTeamAttendance = ({ cycleId }) => {
	console.log('cycleId', cycleId);
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/download_team_attendance',
	}, { manual: true });

	const createDownload = async () => {
		try {
			await trigger({
				params: {
					cycle_id: cycleId,
				},
			});
			Toast.success('Attendance Report Downloaded successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, createDownload, data };
};

export default useGetDownloadTeamAttendance;
