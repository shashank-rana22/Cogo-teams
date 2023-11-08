import { useHarbourRequest } from '@cogoport/request';

const useGetListRatingYears = () => {
	const [{ data, loading }] = useHarbourRequest({
		url    : '/list_rating_year',
		method : 'GET',
	}, { manual: false });

	return {
		loading,
		data,
	};
};

export default useGetListRatingYears;
