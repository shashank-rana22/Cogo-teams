import { useHarbourRequest } from '@cogoport/request';

const useGetAbsenteeInsight = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : './get_absentee_insights',
		method : 'GET',
	}, { manual: false });

	const getAbsenteeInsight = async () => {
		try {
			await trigger();
		} catch (error) {
			console.log('err', error);
		}
	};

	return { getAbsenteeInsight, data, loading };
};

export default useGetAbsenteeInsight;
