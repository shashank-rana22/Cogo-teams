import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCogoAcademyCourse = (id) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_cogo_academy_course',
		method : 'GET',
		params : {
			id,
		},
	}, { manual: true });

	const getCogoAcademyCourse = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		})();
	}, [trigger]);

	useEffect(() => {
		if (id) {
			getCogoAcademyCourse();
		}
	}, [id, getCogoAcademyCourse]);

	return {
		data,
		loading,
		getCogoAcademyCourse,
	};
};

export default useGetCogoAcademyCourse;
