import { useHarbourRequest } from '@cogoport/request';

const useGetCheckinStats = () => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : 'https://007fa42b-5e4d-49ed-8661-21793e7eef34.mock.pstmn.io/get_checkin_stats',
	}, { manual: false });

	return { loading, data };
};

export default useGetCheckinStats;
