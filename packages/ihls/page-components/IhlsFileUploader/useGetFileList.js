import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

function useGetFileList() {
	const { profile = {} } = useSelector((state) => (state));

	const [params, setParams] = useState({
		page      : 1,
		per_page  : 10,
		sort_by   : 'created_at',
		sort_type : 'desc',
		user_id   : profile.user.id,
	});

	const [{ data: fileListData = [], loading: fileListLoading = false }, refetch] = useAthenaRequest({
		url    : '/athena/get_file_details',
		method : 'get',
		params,
	}, { manual: false });

	return {
		params,
		setParams,
		fileListData,
		fileListLoading,
		refetch,
	};
}

export default useGetFileList;
