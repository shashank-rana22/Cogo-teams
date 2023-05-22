import { useRequest } from '@cogoport/request';

const useGetCogoAcademyCourse = (id) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_cogo_academy_course',
		method : 'GET',
		params : {
			id,
		},
	}, { manual: !id });

	return {
		data,
		loading,
		getCogoAcademyCourse: trigger,
	};
};

export default useGetCogoAcademyCourse;
