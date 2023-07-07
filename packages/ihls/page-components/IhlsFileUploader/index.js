import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import FileList from './components/FileList';
import Header from './components/Header';

function IhlsFileUploader() {
	const { profile = {} } = useSelector((state) => (state));

	const [params, setParams] = useState({
		page      : 1,
		per_page  : 10,
		sort_by   : 'created_at',
		sort_type : 'asc',
		user_id   : profile.user.id,
	});

	const [{ data: fileListData = [], loading: fileListLoading = false }, refetch] = useAthenaRequest({
		url    : '/athena/get_file_details',
		method : 'get',
		params,
	}, { manual: false });

	return (
		<div>
			<Header refetch={refetch} />

			<FileList
				params={params}
				setParams={setParams}
				fileListData={fileListData}
				fileListLoading={fileListLoading}
			/>
		</div>
	);
}

export default IhlsFileUploader;
