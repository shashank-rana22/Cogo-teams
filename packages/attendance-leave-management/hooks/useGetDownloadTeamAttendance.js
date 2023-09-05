import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetDownloadTeamAttendance = ({ cycleId }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/download_team_attendance',
	}, { manual: true });

	const createDownload = async () => {
		try {
			const res = await trigger({
				params: {
					cycle_id: cycleId,
				},
			});
			window.open(res?.data, '_self');
			Toast.success('Attendance Report Downloaded successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, createDownload };
};

export default useGetDownloadTeamAttendance;
