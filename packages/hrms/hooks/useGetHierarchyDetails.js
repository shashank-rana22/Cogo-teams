import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

const useGetHierarchyDetails = () => {
	const { user_id } = useSelector(({ profile }) => ({ user_id: profile.user.id }));

	const [params, setParams] = useState({});

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_hierarchy_details',
	}, { manual: false });

	const getHierarchyDetails = useCallback(
		() => {
			try {
				trigger({
					params: {
						user_id: params?.user_id || user_id,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger, params?.user_id, user_id],
	);

	useEffect(() => {
		getHierarchyDetails();
	}, [getHierarchyDetails]);

	return {
		loading,
		data,
		params,
		setParams,
	};
};

export default useGetHierarchyDetails;
