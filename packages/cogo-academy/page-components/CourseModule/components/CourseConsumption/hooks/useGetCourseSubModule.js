import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const useGetCourseSubModule = ({ id }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_course_sub_module',
		method : 'get',
		params : { id },
	}, { manual: false });

	const getCourseSubModuleChapter = useCallback(async () => {
		try {
			const res = await trigger({ params: { id } });
			setData(res?.data);
		} catch (error) {
			Toast.error(error);
		}
	}, [id, trigger]);

	useEffect(() => {
		getCourseSubModuleChapter();
	}, [getCourseSubModuleChapter]);

	return {
		loading,
		data,
	};
};

export default useGetCourseSubModule;
