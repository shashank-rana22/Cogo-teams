import { useRequest } from '@cogoport/request';

const useGetCogoAcademyCourse = ({ id }) => {
	const [{ loading: courseLoading, data }, trigger] = useRequest({
		url    : '/get_cogo_academy_course',
		method : 'GET',
		params : {
			id,
			preview_data_required: true,
		},
	}, { manual: false });

	return {
		data,
		courseLoading,
		trigger,
	};
};

export default useGetCogoAcademyCourse;
